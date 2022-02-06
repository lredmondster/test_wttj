import toggleElementInArray from "@utils/toggleElementInArray";

describe("toggleElementInArray", () => {
  it("It adds the element to the array if not present", () => {
    const expectedResult = ["1", "2", "3"];
    expect(toggleElementInArray(["1", "2"], "3")).toEqual(expectedResult);
  });
  it("It removes the element to the array if present", () => {
    const expectedResult = ["1"];
    expect(toggleElementInArray(["1", "2"], "2")).toEqual(expectedResult);
  });
});
