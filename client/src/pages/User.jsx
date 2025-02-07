import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { TiEdit } from "react-icons/ti";
import { BsTrash3 } from "react-icons/bs";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import usericon from '@/assets/images/user.png'
import moment from "moment";

const User = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    try {
      const response = await deleteData(
        `${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`
      );
      
      // Toggle refresh to trigger data refetch
      setRefreshData(prev => !prev);
      
      // Show success toast
      showToast("success", "Category deleted");
    } catch (error) {
      // Handle any errors during deletion
      showToast("error", "Failed to delete data");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead> Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? 
                data.user.map(user => 
                  <TableRow key={user._id}>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <img src ={user.avatar ||
                            usericon} className='w-10' />

                    </TableCell>
                    <TableCell>{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => handleDelete(user._id)}
                        variant="outline"
                        className="hover:bg-blue-500 hover:text-white"
                      >
                        <BsTrash3 />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
                :
               (
                <TableRow>
                  <TableCell colSpan="3">No Categories Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default User;
