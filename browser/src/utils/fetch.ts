const headers = {
  "Accepts": "application/json",
  "Content-Type": "application/json",
  "X-CSRF-Token": document.querySelectorAll('[name="csrf-token"]')[0].getAttribute("content"),
};

const credentials = "include";

const selectData = (request) => request.then((response) => response.json());

export const Fetch = {
  post: (url: string, data: any) => (
    selectData(
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        credentials,
        headers,
      })
    )
  ),
  get: (url: string, data: any = {}) => (
    //TODO: query string
    selectData(
      fetch(url, {
        method: "GET",
        headers,
        credentials,
      })
    )
  )
}
