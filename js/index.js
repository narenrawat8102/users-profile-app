"use strict";

let allUsersData = null;

// Get All User Promise / Code Producing
const profilesData = fetch("https://dummyapi.io/data/v1/user?limit=10", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "app-id": "62244a20de40fc669036d85b",
  },
});

// Code Consuming
profilesData
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    allUsersData = data.data;

    createUserTemplate(allUsersData);
  })
  .then((data) => {
    const getAllViewDetailsBtns = document.querySelectorAll(".view-details");
    for (let i = 0; i < getAllViewDetailsBtns.length; i++) {
      const viewDetailsBtn = getAllViewDetailsBtns[i];

      viewDetailsBtn.addEventListener("click", function () {
        const getModalBodyEle = document.querySelector(".modal-body");
        getModalBodyEle.innerHTML = `<img class="loader" src="./assets/loader.gif" alt="" />`;
        const appId = viewDetailsBtn.getAttribute("data-id");

        // Get Single User Promise / Code Producing
        const profileData = fetch(`https://dummyapi.io/data/v1/user/${appId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "app-id": "62244a20de40fc669036d85b",
          },
        });

        profileData
          .then((res) => res.json())
          .then((user) => {
            const userDetailsTemplate = `<div class="pic">
            <img
              src="${user.picture}"
              alt=""
            />
          </div>
          <div class="contact">
            <h3>Contact Details:</h3>
            <br />
            <p><b>Name: </b>${
              user.title + " " + user.firstName + " " + user.lastName
            }</p>
            <p><b>Gender: </b>${user.gender}</p>
            <p><b>Date of Birth: </b>${user.dateOfBirth}</p>
            <p><b>Register Date: </b>${user.registerDate}</p>
            <p><b>Email: </b>${user.email}</p>
            <p><b>Phone: </b>${user.phone}</p>
          </div>
          <div class="address">
            <h3>Address:</h3>
            <br />
            <p><b>State: </b>${user.location.state}</p>
            <p><b>Street: </b>${user.location.street}</p>
            <p><b>City: </b>${user.location.city}</p>
            <p><b>Country: </b>${user.location.country}</p>
            <p><b>Timezone: </b>${user.location.timezone}</p>
          </div>`;

            getModalBodyEle.innerHTML = userDetailsTemplate;
            console.log(user);
          });

        console.log("Button Clicked", appId);
      });
    }
  });

// Creating user Template
function createUserTemplate(usersList) {
  let allUsersStr = "";
  for (let i = 0; i < usersList.length; i++) {
    const user = usersList[i];

    allUsersStr += `
      <div class="card">
        <div class="image">
            <img src="${user.picture}" alt="Avatar"/>
        </div>
        <h4>${user.title + " " + user.firstName + " " + user.lastName}</h4>
        <p><button type="button" class="btn btn-info btn-lg view-details" data-toggle="modal" data-target="#myModal" data-id="${
          user.id
        }">View Details</button></p>
      </div>`;
  }

  const getContentContainerEle = document.querySelector(".content_container");
  getContentContainerEle.innerHTML = allUsersStr;
}

function userDetailsButtonClicked() {
  console.log("button clicked");
}
