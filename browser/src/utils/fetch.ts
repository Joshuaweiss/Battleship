const headers = {
  "Accepts": "application/json",
  "Content-Type": "application/json",
  "X-CSRF-Token": document.querySelectorAll('[name="csrf-token"]')[0].getAttribute("content"),
};

const credentials = "include";

const selectData = (request) => request.then((response) => response.json());

const bodyMethods = (method) => (
  (url, data = {}) => (
    selectData(
      fetch(url, {
        method: method,
        body: JSON.stringify(data),
        credentials,
        headers,
      })
    )
  )
)

export const Fetch = {
  post: bodyMethods("POST"),
  patch: bodyMethods("PATCH"),
  delete: bodyMethods("DELETE"),
  get: (url: string, data: any = {}) => (
    //TODO: query string
    selectData(
      fetch(url, {
        method: "GET",
        headers,
        credentials,
      })
    )
  ),
}
