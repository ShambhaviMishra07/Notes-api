
 const API = "http://localhost:3000/notes";
        const AUTH_API = "http://localhost:3000/auth";

        // 🔁 Check login on load
        window.onload = () => {
            const token = localStorage.getItem("token");

            if (token) {
                document.getElementById("auth").style.display = "none";
                document.getElementById("app").style.display = "block";
                getNotes();
            }
        };

        // 📝 Register
        async function register() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            await fetch(`${AUTH_API}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            alert("Registered! Now login.");
        }

        // 🔐 Login
        async function login() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const res = await fetch(`${AUTH_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            // ✅ Save token
            localStorage.setItem("token", data.token);

            // Show app
            document.getElementById("auth").style.display = "none";
            document.getElementById("app").style.display = "block";

            getNotes();
        }

        // 🚪 Logout
        function logout() {
            localStorage.removeItem("token");
            location.reload();
        }

        // 📥 Get notes
        async function getNotes() {
            const res = await fetch(API, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            const data = await res.json();

            const notesDiv = document.getElementById("notes");
            notesDiv.innerHTML = "";

            data.forEach(note => {
                notesDiv.innerHTML += `
                    <div class="note">
                        <h3>${note.title}</h3>
                        <p>${note.content}</p>
                        <button onclick="deleteNote('${note._id}')">Delete</button>
                        <button onclick="updateNote('${note._id}')">Edit</button>
                        <hr>
                    </div>
                `;
            });
        }

        // ➕ Add note
        async function addNote() {
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;

            await fetch(`${API}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, content })
            });

             // 🔥 Clear inputs
         document.getElementById("title").value = "";
         document.getElementById("content").value = "";

            getNotes();
        }

        // ❌ Delete note
        async function deleteNote(id) {
            await fetch(`${API}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            getNotes();
        }

        // ✏️ Update note
        async function updateNote(id) {
            const title = prompt("New title:");
            const content = prompt("New content:");

            await fetch(`${API}/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, content })
            });

            getNotes();
        }
  
