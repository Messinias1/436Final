// GUARDIAN --------------------------------------------

document
  .getElementById("guardianForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const groupRoleID = document.getElementById("groupRoleID").value;
    const groupRole = document.getElementById("groupRole").value;
    const foodRestriction = document.getElementById("foodRestriction").value;

    fetch("/addGuardian", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, groupRoleID, groupRole, foodRestriction }),
    })
      .then((response) => response.text())
      .then((data) => alert(data));
  });

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const guardianList = document.getElementById("guardianList");

  toggleButton.addEventListener("click", function () {
    // Toggle the display of the guardianList
    if (guardianList.style.display === "none") {
      guardianList.style.display = "block";
      // Optional: Load the guardian list if not already loaded
      loadGuardians();
    } else {
      guardianList.style.display = "none";
    }
  });

  function loadGuardians() {
    fetch("/getGuardian")
      .then((response) => response.json())
      .then((data) => {
        guardianList.innerHTML = ""; // Clear existing content
        data.forEach((guardian) => {
          const div = document.createElement("div");
          div.id = `guardian_${guardian.id}`;

          // Guardian info
          div.textContent = `Name: ${guardian.name}, Role: ${guardian.groupRole}, Restriction: ${guardian.foodRestriction}`;

          // Edit button
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editGuardian(guardian);

          // Delete button
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deleteGuardian(guardian.id);

          div.appendChild(editButton);
          div.appendChild(deleteButton);
          guardianList.appendChild(div);
        });
      })
      .catch((error) => console.error("Error loading guardians:", error));
  }

  function editGuardian(guardian) {
    // Create form elements for editing
    const editForm = document.createElement("form");
    editForm.innerHTML = `
      <input type="text" id="editGroupRole_${guardian.id}" placeholder="Group Role" value="${guardian.groupRole}">
      <input type="text" id="editFoodRestriction_${guardian.id}" placeholder="Food Restriction" value="${guardian.foodRestriction}">
      <button type="submit">Save</button>
    `;
    editForm.onsubmit = (e) => {
      e.preventDefault();
      updateGuardian(guardian.id);
    };

    const guardianDiv = document.querySelector(`#guardian_${guardian.id}`);
    guardianDiv.innerHTML = "";
    guardianDiv.appendChild(editForm);
  }

  function updateGuardian(id) {
    const groupRole = document.getElementById(`editGroupRole_${id}`).value;
    const foodRestriction = document.getElementById(
      `editFoodRestriction_${id}`
    ).value;

    fetch(`/updateGuardian/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupRole, foodRestriction }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadGuardians(); // Reload the list
      })
      .catch((error) => console.error("Error updating guardian:", error));
  }

  function deleteGuardian(id) {
    fetch(`/deleteGuardian/${id}`, { method: "DELETE" })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadGuardians(); // Reload the list
      })
      .catch((error) => console.error("Error deleting guardian:", error));
  }
});

// CHILD ------------------------------------------------------------------------------
document.getElementById("childForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("cName").value;
  const groupRoleID = document.getElementById("cGroupRoleID").value;
  const groupRole = document.getElementById("cGroupRole").value;
  const foodRestriction = document.getElementById("cFoodRestriction").value;

  fetch("/addChild", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, groupRoleID, groupRole, foodRestriction }),
  })
    .then((response) => response.text())
    .then((data) => alert(data));
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("cToggleButton");
  const childList = document.getElementById("childList");

  toggleButton.addEventListener("click", function () {
    if (childList.style.display === "none") {
      childList.style.display = "block";
      // Optional: Load the guardian list if not already loaded
      loadChildren();
    } else {
      childList.style.display = "none";
    }
  });

  function loadChildren() {
    fetch("/getChild")
      .then((response) => response.json())
      .then((data) => {
        childList.innerHTML = ""; // Clear existing content
        data.forEach((child) => {
          const div = document.createElement("div");
          div.id = `child_${child.id}`;

          // child info
          div.textContent = `Name: ${child.name}, Role: ${child.groupRole}, Restriction: ${child.foodRestriction}`;

          // Edit button
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editChild(child);

          // Delete button
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deleteChild(child.id);

          div.appendChild(editButton);
          div.appendChild(deleteButton);
          childList.appendChild(div);
        });
      })
      .catch((error) => console.error("Error loading children:", error));
  }

  function editChild(child) {
    // Create form elements for editing
    const editForm = document.createElement("form");
    editForm.innerHTML = `
      <input type="text" id="editGroupRole_${child.id}" placeholder="Group Role" value="${child.groupRole}">
      <input type="text" id="editFoodRestriction_${child.id}" placeholder="Food Restriction" value="${child.foodRestriction}">
      <button type="submit">Save</button>
    `;
    editForm.onsubmit = (e) => {
      e.preventDefault();
      updateChild(child.id);
    };

    const childDiv = document.querySelector(`#child_${child.id}`);
    childDiv.innerHTML = "";
    childDiv.appendChild(editForm);
  }

  function updateChild(id) {
    const groupRole = document.getElementById(`editGroupRole_${id}`).value;
    const foodRestriction = document.getElementById(
      `editFoodRestriction_${id}`
    ).value;

    fetch(`/updateChild/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupRole, foodRestriction }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadChildren(); // Reload the list
      })
      .catch((error) => console.error("Error updating child:", error));
  }

  function deleteChild(id) {
    fetch(`/deleteChild/${id}`, { method: "DELETE" })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadChildren(); // Reload the list
      })
      .catch((error) => console.error("Error deleting child:", error));
  }
});

// Driver ------------------------------------------------------------------------------
document.getElementById("driverForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("dName").value;
  const groupRoleID = document.getElementById("dGroupRoleID").value;
  const groupRole = document.getElementById("dGroupRole").value;
  const foodRestriction = document.getElementById("dFoodRestriction").value;

  fetch("/addDriver", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, groupRoleID, groupRole, foodRestriction }),
  })
    .then((response) => response.text())
    .then((data) => alert(data));
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("dToggleButton");
  const driverList = document.getElementById("driverList");

  toggleButton.addEventListener("click", function () {
    if (driverList.style.display === "none") {
      driverList.style.display = "block";
      // Optional: Load the guardian list if not already loaded
      loadDrivers();
    } else {
      driverList.style.display = "none";
    }
  });

  function loadDrivers() {
    fetch("/getDriver")
      .then((response) => response.json())
      .then((data) => {
        driverList.innerHTML = ""; // Clear existing content
        data.forEach((driver) => {
          const div = document.createElement("div");
          div.id = `driver_${driver.id}`;

          // driver info
          div.textContent = `Name: ${driver.name}, Role: ${driver.groupRole}, Restriction: ${driver.foodRestriction}`;

          // Edit button
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editDriver(driver);

          // Delete button
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deleteDriver(driver.id);

          div.appendChild(editButton);
          div.appendChild(deleteButton);
          driverList.appendChild(div);
        });
      })
      .catch((error) => console.error("Error loading driver:", error));
  }

  function editDriver(driver) {
    // Create form elements for editing
    const editForm = document.createElement("form");
    editForm.innerHTML = `
      <input type="text" id="editGroupRole_${driver.id}" placeholder="Group Role" value="${driver.groupRole}">
      <input type="text" id="editFoodRestriction_${driver.id}" placeholder="Food Restriction" value="${driver.foodRestriction}">
      <button type="submit">Save</button>
    `;
    editForm.onsubmit = (e) => {
      e.preventDefault();
      updateDriver(driver.id);
    };

    const driverDiv = document.querySelector(`#driver_${driver.id}`);
    driverDiv.innerHTML = "";
    driverDiv.appendChild(editForm);
  }

  function updateDriver(id) {
    const groupRole = document.getElementById(`editGroupRole_${id}`).value;
    const foodRestriction = document.getElementById(
      `editFoodRestriction_${id}`
    ).value;

    fetch(`/updateDriver/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupRole, foodRestriction }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadDrivers(); // Reload the list
      })
      .catch((error) => console.error("Error updating driver:", error));
  }

  function deleteDriver(id) {
    fetch(`/deleteDriver/${id}`, { method: "DELETE" })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadDrivers(); // Reload the list
      })
      .catch((error) => console.error("Error deleting driver:", error));
  }
});

// Pet ------------------------------------------------------------------------------
document.getElementById("petForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("pName").value;
  const groupRole = document.getElementById("pGroupRole").value;
  const foodRestriction = document.getElementById("pFoodRestriction").value;

  fetch("/addPet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, groupRole, foodRestriction }),
  })
    .then((response) => response.text())
    .then((data) => alert(data));
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("pToggleButton");
  const petList = document.getElementById("petList");

  toggleButton.addEventListener("click", function () {
    if (petList.style.display === "none") {
      petList.style.display = "block";
      // Optional: Load the guardian list if not already loaded
      loadPets();
    } else {
      petList.style.display = "none";
    }
  });

  function loadPets() {
    fetch("/getPet")
      .then((response) => response.json())
      .then((data) => {
        petList.innerHTML = ""; // Clear existing content
        data.forEach((pet) => {
          const div = document.createElement("div");
          div.id = `pet_${pet.id}`;

          // driver info
          div.textContent = `Name: ${pet.name}, Role: ${pet.groupRole}, Restriction: ${pet.foodRestriction}`;

          // Edit button
          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editPet(pet);

          // Delete button
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deletePet(pet.id);

          div.appendChild(editButton);
          div.appendChild(deleteButton);
          petList.appendChild(div);
        });
      })
      .catch((error) => console.error("Error loading pet:", error));
  }

  function editPet(pet) {
    // Create form elements for editing
    const editForm = document.createElement("form");
    editForm.innerHTML = `
      <input type="text" id="editGroupRole_${pet.id}" placeholder="Group Role" value="${pet.groupRole}">
      <input type="text" id="editFoodRestriction_${pet.id}" placeholder="Food Restriction" value="${pet.foodRestriction}">
      <button type="submit">Save</button>
    `;
    editForm.onsubmit = (e) => {
      e.preventDefault();
      updatePet(pet.id);
    };

    const petDiv = document.querySelector(`#pet_${pet.id}`);
    petDiv.innerHTML = "";
    petDiv.appendChild(editForm);
  }

  function updatePet(id) {
    const groupRole = document.getElementById(`editGroupRole_${id}`).value;
    const foodRestriction = document.getElementById(
      `editFoodRestriction_${id}`
    ).value;

    fetch(`/updatePet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupRole, foodRestriction }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadPets(); // Reload the list
      })
      .catch((error) => console.error("Error updating pet:", error));
  }

  function deletePet(id) {
    fetch(`/deletePet/${id}`, { method: "DELETE" })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        loadPets(); // Reload the list
      })
      .catch((error) => console.error("Error deleting pet:", error));
  }
});
