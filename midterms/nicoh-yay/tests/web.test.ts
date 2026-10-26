// @vitest-environment happy-dom
import { beforeEach, afterEach, it, expect, vi } from "vitest";
function click(selector: string) {
  const b = document.querySelector<HTMLButtonElement>(selector);
  expect(b, selector).not.toBeNull();
  b!.click();
}
beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  document.body.innerHTML = '<div id="app"></div>';
});
afterEach(() => {
  vi.useRealTimers();
});
it("plays a complete day with pause, coffee keys, interruptions, journal, save and reset", async () => {
  await import("../web/src/main.js");
  expect(document.title).toBeDefined();
  expect(document.body.textContent).toContain("Richard Hofmeier");
  const title=document.querySelector<HTMLImageElement>('[data-art="title"]')!;
  expect(title.getAttribute("src")).toContain("art/title.png");
  title.dispatchEvent(new Event("error"));
  expect(title.hidden).toBe(true);
  expect(title.parentElement!.getAttribute("aria-label")).toBeTruthy();
  click("#start");
  const portrait=document.querySelector<HTMLImageElement>('.dialogue [data-art="melanie"]')!;
  expect(portrait).not.toBeNull();
  portrait.dispatchEvent(new Event("load"));
  expect(portrait.parentElement!.classList.contains("loaded")).toBe(true);
  portrait.dispatchEvent(new Event("error"));
  expect(portrait.parentElement!.classList.contains("loaded")).toBe(false);
  expect(document.querySelector('[data-art="apartment"]')).toBeNull();
  click("[data-action]");
  click("[data-action]");
  expect(document.querySelector(".keys")).not.toBeNull();
  expect(document.querySelector('.background [data-art="cart_street"]')).not.toBeNull();
  click("#pause");
  vi.advanceTimersByTime(20000);
  expect(document.body.textContent).toContain("The street can wait.");
  click("#resume");
  for (let i = 0; i < 5; i++) {
    const next = document.querySelector<HTMLButtonElement>(".key.next");
    if (next) next.click();
  }
  expect(document.querySelector(".reaction")?.textContent).toContain("cup");
  for (let i = 0; i < 3; i++) {
    vi.advanceTimersByTime(35100);
    if (i < 2) {
      expect(document.querySelector(".choices")).not.toBeNull();
      click("[data-action]");
    }
  }
  expect(document.body.textContent).toContain("THE APARTMENT");
  click("[data-action]");
  expect(document.querySelector(".journal")).not.toBeNull();
  expect(
    JSON.parse(localStorage.getItem("small-change-v1")!).archive,
  ).toHaveLength(1);
  click('[data-action="continue"]');
  expect(document.body.textContent).toContain("DAY 2");
  click("#new");
  click("#cancel-reset");
  expect(document.body.textContent).toContain("DAY 2");
  click("#new");
  click("#confirm-reset");
  expect(document.body.textContent).toContain("DAY 1");
});
