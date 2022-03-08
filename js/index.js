"use strict";

let allUsersData = null;
const baseApiURL = "https://dummyapi.io/data/v1";
const loaderHTML = `<div class="lds-roller">
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
</div>`;
const getContentContainerEle = document.querySelector(".content_container");
getContentContainerEle.innerHTML = loaderHTML;

// Get All User Promise / Code Producing
const profilesData = fetch(`${baseApiURL}/user?page=1&limit=10`, {
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
    document.querySelector(".pagination_container").classList.remove("hide");
  })
  .then((data) => {
    addClickHandlerOnViewDetails();
  })
  .then((data) => {
    const getAllPageBtns = document.querySelectorAll(".page_num");
    for (let i = 0; i < getAllPageBtns.length; i++) {
      const pageBtn = getAllPageBtns[i];

      pageBtn.addEventListener("click", function (e) {
        getContentContainerEle.innerHTML = loaderHTML;
        e.preventDefault();
        for (let i = 0; i < getAllPageBtns.length; i++) {
          const singleBtn = getAllPageBtns[i];

          singleBtn.classList.remove("active");
        }
        const pageNum = pageBtn.getAttribute("data-id");
        pageBtn.classList.add("active");

        const getNextPageData = fetch(
          `${baseApiURL}/user?page=${pageNum}&limit=10`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "app-id": "62244a20de40fc669036d85b",
            },
          }
        );

        getNextPageData
          .then((res) => res.json())
          .then((data) => {
            allUsersData = data.data;
            createUserTemplate(allUsersData);
            console.log(data);
          })
          .then((data) => {
            addClickHandlerOnViewDetails();
          });
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

function addClickHandlerOnViewDetails() {
  const getAllViewDetailsBtns = document.querySelectorAll(".view-details");
  for (let i = 0; i < getAllViewDetailsBtns.length; i++) {
    const viewDetailsBtn = getAllViewDetailsBtns[i];

    viewDetailsBtn.addEventListener("click", function () {
      const getModalBodyEle = document.querySelector(".modal-body");
      getModalBodyEle.innerHTML = `<img class="loader" src="./assets/loader.gif" alt="" />`;
      const appId = viewDetailsBtn.getAttribute("data-id");

      // Get Single User Promise / Code Producing
      const profileData = fetch(`${baseApiURL}/user/${appId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "app-id": "62244a20de40fc669036d85b",
        },
      });

      profileData
        .then((res) => res.json())
        .then((user) => {
          const userDetailsTemplate = `
            <div class="pic">
               <img src="${user.picture}" alt=""/>
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
        });
    });
  }
}
