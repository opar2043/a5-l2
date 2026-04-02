import React from "react";
import { User as UserIcon, Calendar } from "lucide-react";
import { userRoute } from "@/src/app/components/service/users";
import UserActions from "@/src/app/components/Layout/UserActions";

export default async function UsersPage() {
  const responseData = await userRoute.getUsers();
  const users = Array.isArray(responseData) ? responseData : responseData?.data || [];

  return (
    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-black">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black flex items-center gap-2">
            <UserIcon className="w-6 h-6 text-[#D96C2C]" />
            Manage Users
          </h1>
          <p className="text-gray-500 mt-1">View and manage all registered CineVerse users.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined At</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img src={user.image} alt={user.name!} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#D96C2C]/10 text-[#D96C2C] flex items-center justify-center font-bold border border-[#D96C2C]/20">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                        )}
                        <span className="font-medium text-black">{user.name || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.email || "No Email"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {user.role || 'USER'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <UserActions 
                        userId={user.id} 
                        userName={user.name || "Unknown"} 
                        currentRole={user.role || "USER"} 
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}