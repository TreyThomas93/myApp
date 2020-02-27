class HTTP {
  // GET Data
  async get() {
    const response = await fetch("http://localhost:3000/comments");

    const responseData = await response.json();

    return responseData;
  }

  async post(data) {
    let dataToSend = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    };

    const response = await fetch("http://localhost:3000/comments", dataToSend);

    const responseData = await response.json();

    return responseData;
  }

  async put(data) {
    let dataToSend = {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(
      `http://localhost:3000/comments/${data.id}`,
      dataToSend
    );

    const responseData = await response.json();

    return responseData;
  }

  async delete(data) {
    let dataToSend = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    };

    const response = await fetch(
      `http://localhost:3000/comments/${data.id}`,
      dataToSend
    );

    const responseData = await response.json();

    return responseData;
  }
}

export const http = new HTTP();
