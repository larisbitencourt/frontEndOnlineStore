import * as api from "../services/api";
import mockedCategoriesResult from "../__mocks__/categories";

describe("1 - Implemente o módulo de acesso à api do Mercado Livre", () => {
  it("Implementa a função `getCategories`", () => {
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockedCategoriesResult),
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    return api.getCategories().then((categories) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products/categories"
      );
      expect(categories).toEqual(mockedCategoriesResult);
    });
  });

  it("Implementa a função `getProductsFromCategoryAndQuery`", () => {
    const categoryId = "category1";
    const query = "my-query";
    const successResponseBody = {};

    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(successResponseBody),
    });

    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    return api
      .getProductsFromCategoryAndQuery(categoryId, query)
      .then((products) => {
        expect(global.fetch).toHaveBeenCalled();
        expect(products).toEqual(successResponseBody);
      });
  });
});
