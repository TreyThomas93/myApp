// MAIN APP //
import { ui } from "./ui";
import { http } from "./http";

const App = (function() {
  // Event Listeners

  // create state event listeners
  document
    .querySelector("#create-comment-btn")
    .addEventListener("click", createComment);

  function toCreateState(e) {
    ui.changeCurrentState("create");
    e.preventDefault();
  }

  function createComment() {
    const comment = document.querySelector("#create-comment").value;

    if (comment != "") {
      const data = {
        comment
      };

      http
        .post(data)
        .then(res => {
          ui.showAlert("Comment created!!", "alert-success");
          getComments();
          ui.clearTextArea();
        })
        .catch(err => ui.showAlert(err, "alert-error"));
    } else {
      ui.showAlert("Invalid Entry", "alert-error");
    }
  }

  ///

  // edit state event listeners
  document
    .querySelector("#exit-edit-btn")
    .addEventListener("click", toCreateState);

  document
    .querySelector("#edit-comment-btn")
    .addEventListener("click", editComment);

  function editComment(e) {
    const id = document.querySelector("#hidden-id").value;
    const comment = document.querySelector("#edit-comment").value;

    if (comment != "") {
      const data = {
        id,
        comment
      };

      http
        .put(data)
        .then(data => {
          ui.showAlert("Comment Updated!!", "alert-success");
          getComments();
          ui.clearTextArea();
          ui.changeCurrentState("create");
        })
        .catch(err => ui.showAlert(err, "alert-error"));
    } else {
      ui.showAlert("Invalid Entry", "alert-error");
    }

    e.preventDefault();
  }

  ///

  // mutual event listeners
  document.querySelector(".post-div").addEventListener("click", toEditState);
  document.querySelector(".post-div").addEventListener("click", deleteComment);

  function getComments() {
    http
      .get()
      .then(comments => ui.showComments(comments))
      .catch(err => console.log(err));
  }

  function toEditState(e) {
    if (e.target.classList.contains("edit-btn")) {
      const id = e.target.parentElement.parentElement.dataset.id;
      const comment = e.target.parentElement.parentElement.children[0].textContent.trim();

      const data = {
        id,
        comment
      };

      ui.fillEditForm(data);

      ui.changeCurrentState("edit");
    }
    e.preventDefault();
  }

  function deleteComment(e) {
    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Are You Sure You Want To Delete Comment?")) {
        const id = e.target.parentElement.parentElement.dataset.id;

        const data = {
          id
        };

        http
          .delete(data)
          .then(res => {
            ui.showAlert("Comment Deleted!!", "alert-success");
            getComments();
          })
          .catch(err => ui.showAlert(err, "alert-error"));
      }
    }

    e.preventDefault();
  }

  return {
    init: function() {
      // Create state by default on load
      ui.changeCurrentState("create");

      // Get Comments
      getComments();
    }
  };
})();

App.init();
