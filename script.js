// script.js
const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
  ];
  
  const studentForm = document.getElementById('student-form');
  const nameInput = document.getElementById('name-input');
  const ageInput = document.getElementById('age-input');
  const gradeInput = document.getElementById('grade-input');
  const degreeInput = document.getElementById('degree-input');
  const emailInput = document.getElementById('email-input');
  const submitButton = document.getElementById('submit-button');
  const searchInput = document.getElementById('search-input');
  const studentTableBody = document.querySelector('#student-table tbody');
  
  let lastId = students.length > 0 ? students[students.length - 1].ID : 0;
  
  // Function to generate a new student ID
  function generateId() {
    lastId++;
    return lastId;
  }
  
  // Function to render students into the table
  function renderStudents() {
    studentTableBody.innerHTML = '';
  
    students.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td class="actions">
          <button class="edit-button" data-id="${student.ID}">Edit</button>
          <button class="delete-button" data-id="${student.ID}">Delete</button>
        </td>
      `;
  
      studentTableBody.appendChild(row);
    });
  }
  
  // Function to clear the form inputs
  function clearFormInputs() {
    nameInput.value = '';
    ageInput.value = '';
    gradeInput.value = '';
    degreeInput.value = '';
    emailInput.value = '';
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const grade = gradeInput.value;
    const degree = degreeInput.value;
    const email = emailInput.value;
    const id = generateId();
  
    const newStudent = { ID: id, name, age, grade, degree, email };
    students.push(newStudent);
  
    renderStudents();
    clearFormInputs();
  }
  
  // Function to handle editing a student
  function handleEditStudent(event) {
    const studentId = parseInt(event.target.dataset.id);
    const student = students.find((student) => student.ID === studentId);
  
    if (student) {
      nameInput.value = student.name;
      ageInput.value = student.age;
      gradeInput.value = student.grade;
      degreeInput.value = student.degree;
      emailInput.value = student.email;
      submitButton.innerText = 'Edit Student';
  
      // Remove the student from the array temporarily while editing
      const studentIndex = students.findIndex((student) => student.ID === studentId);
      if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
      }
    }
  }
  
  // Function to handle deleting a student
  function handleDeleteStudent(event) {
    const studentId = parseInt(event.target.dataset.id);
    const studentIndex = students.findIndex((student) => student.ID === studentId);
  
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderStudents();
    }
  }
  
  // Function to handle search
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
  
    const filteredStudents = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.degree.toLowerCase().includes(searchTerm)
      );
    });
  
    studentTableBody.innerHTML = '';
  
    if (filteredStudents.length > 0) {
      filteredStudents.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.ID}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
          <td>${student.degree}</td>
          <td>${student.email}</td>
          <td class="actions">
            <button class="edit-button" data-id="${student.ID}">Edit</button>
            <button class="delete-button" data-id="${student.ID}">Delete</button>
          </td>
        `;
  
        studentTableBody.appendChild(row);
      });
    } else {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="7">No students found</td>';
      studentTableBody.appendChild(row);
    }
  }
  
  // Event listeners
  studentForm.addEventListener('submit', handleFormSubmit);
  studentTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
      handleEditStudent(event);
    } else if (event.target.classList.contains('delete-button')) {
      handleDeleteStudent(event);
    }
  });
  searchInput.addEventListener('input', handleSearch);
  
  // Initial rendering of students
  renderStudents();
  