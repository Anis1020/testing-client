import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
// import useAuth from "../../../CustomHooks/useAuth";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  //   const { user } = useAuth();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleMakeAdmin = async (user) => {
    const makeAdmin = await axiosSecure.patch(`/users/${user._id}`);
    console.log(makeAdmin);
  };
  const handleDeleteUser = async (user) => {
    const deleteUser = await axiosSecure.delete(`/users/${user._id}`);
    if (deleteUser.data.deletedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr key={user._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td onClick={() => handleMakeAdmin(user)}>
                  {user.roll == "admin" ? "Admin" : "user"}
                </td>
                <td onClick={() => handleDeleteUser(user)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
