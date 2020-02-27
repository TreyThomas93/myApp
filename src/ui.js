import { http } from "./http";

const UICtrl = (function() {
  return {
    // CHECK CURRENT STATE (EDIT, CREATE)
    changeCurrentState: function(state) {
      if (state === "create") {
        document.querySelector(".edit-div").style.display = "none";
        document.querySelector(".create-div").style.display = "grid";
      } else if (state === "edit") {
        document.querySelector(".create-div").style.display = "none";
        document.querySelector(".edit-div").style.display = "grid";
      }
    },
    showComments: function(comments) {
      let output = "";

      comments.forEach(comment => {
        output += `
          
          
            <div class="inner-post-div p1 box-shadow mb-1" data-id="${comment.id}">
                <p>
                    ${comment.comment}
                </p>
                <div class="edit-delete-container p1">
                    <button class="edit-btn btn-2">Edit</button>
                    <button class="delete-btn btn-2">Delete</button>
                </div>
            </div>
          
          
          `;
      });

      document.querySelector(".post-div").innerHTML = output;
    },
    clearTextArea: function() {
      document.querySelector("#create-comment").value = "";
      document.querySelector("#edit-comment").value = "";
    },
    showAlert: function(message, type) {
      const alertDiv = document.querySelector("#alert-div");

      alertDiv.innerHTML = "";

      alertDiv.className = type;

      alertDiv.appendChild(document.createTextNode(message));

      alertDiv.style.display = "block";

      setTimeout(() => {
        alertDiv.style.display = "none";
        alertDiv.innerHTML = "";
      }, 3000);
    },
    fillEditForm: function(data) {
      document.querySelector("#edit-comment").value = data.comment;
      document.querySelector("#hidden-id").value = data.id;
    }
  };
})();

export const ui = UICtrl;
