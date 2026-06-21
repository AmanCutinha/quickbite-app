import { useEffect, useState } from "react";
import AddUserForm from "@/components/AddUserForm";

interface User {
  user_id: number;
  name: string;
  email: string;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchUsers = () => {
    const storedUser = localStorage.getItem("foodUser");
    const role = storedUser ? JSON.parse(storedUser).role : null;

    fetch("http://localhost:5000/users", {
      headers: {
        "x-user-role": role || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users", err));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("foodUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    }

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "x-user-role": userRole || "",
        },
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.user_id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const startEditing = (user: User) => {
    setEditingUserId(user.user_id);
    setEditedUser({ ...user });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleUpdate = async () => {
    if (!editingUserId) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${editingUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": userRole || "",
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setEditingUserId(null);
        setEditedUser({});
        fetchUsers();
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {(userRole === "admin" || userRole === "restaurant_owner") && (
        <AddUserForm onUserAdded={fetchUsers} />
      )}

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.user_id} className="p-4 border rounded shadow">
            {editingUserId === user.user_id ? (
              <>
                <input
                  value={editedUser.name || ""}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  className="border p-1 mr-2"
                />
                <input
                  value={editedUser.email || ""}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                  className="border p-1 mr-2"
                />
                <select
                  value={editedUser.role || ""}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, role: e.target.value })
                  }
                  className="border p-1 mr-2"
                >
                  <option value="customer">Customer</option>
                  <option value="restaurant_owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-300 text-black px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                {(userRole === "admin" || userRole === "restaurant_owner") && (
                  <>
                    <button
                      onClick={() => startEditing(user)}
                      className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
