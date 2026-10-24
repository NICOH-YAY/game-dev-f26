export type ModelReply = { text: string; tok_in: number; tok_out: number };
export interface ModelController {
  readonly kind: "model";
  readonly modelId: string;
  complete(prompt: string, signal: AbortSignal): Promise<ModelReply>;
}
export class MockModel implements ModelController {
  readonly kind = "model" as const;
  readonly modelId = "mock-scripted";
  private i = 0;
  constructor(private replies: string[]) {}
  async complete(_prompt: string, signal: AbortSignal): Promise<ModelReply> {
    const reply =
      this.replies[this.i++] ?? '{"action":"GUARD","intent":"wait"}';
    if (reply === "timeout")
      return new Promise((_, reject) => {
        if (signal.aborted) reject(new Error("aborted"));
        else
          signal.addEventListener("abort", () => reject(new Error("aborted")), {
            once: true,
          });
      });
    if (reply === "error") throw new Error("mock error");
    return { text: reply, tok_in: 0, tok_out: 0 };
  }
}
export class VertexGemini implements ModelController {
  readonly kind = "model" as const;
  readonly modelId: string;
  private project: string;
  private location: string;
  constructor(live: boolean) {
    if (!live) throw new Error("Vertex requires explicit --live");
    const { GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION, COURSE_MODEL } =
      process.env;
    if (!GOOGLE_CLOUD_PROJECT || !GOOGLE_CLOUD_LOCATION || !COURSE_MODEL)
      throw new Error(
        "Set GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION, COURSE_MODEL and authenticate ADC",
      );
    this.project = GOOGLE_CLOUD_PROJECT;
    this.location = GOOGLE_CLOUD_LOCATION;
    this.modelId = COURSE_MODEL;
  }
  async complete(prompt: string, signal: AbortSignal): Promise<ModelReply> {
    const { GoogleGenAI } = await import("@google/genai");
    const client = new GoogleGenAI({
      vertexai: true,
      project: this.project,
      location: this.location,
    });
    const reply = await client.models.generateContent({
      model: this.modelId,
      contents: prompt,
      config: {
        temperature: 0,
        responseMimeType: "application/json",
        httpOptions: { timeout: 20000 },
        abortSignal: signal,
      },
    });
    return {
      text: reply.text ?? "",
      tok_in: reply.usageMetadata?.promptTokenCount ?? 0,
      tok_out: reply.usageMetadata?.candidatesTokenCount ?? 0,
    };
  }
}
