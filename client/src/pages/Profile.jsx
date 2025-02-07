import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { setUser } from "@/redux/user/user.slice";
import Loading from "@/components/Loading";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";

const Profile = () => {

  const [filePreview, setPreview] = useState();
  const[file,setFile]=useState();
  const user = useSelector((state) => state.user);

  const {
    data: userData, loading, error, } = useFetch(`${getEnv("VITE_API_BASE_URL")}/user/get-user/${user?.user?._id}`,
    { method: "get", credentials: "include" }
  );

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email(),
    bio: z.string().min(8, "Bio must be at least 8 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name ,
        email: userData.user.email ,
        bio: userData.user.bio ,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(values))
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`, {
          method: "put",
          credentials: "include",
          body: formData
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
      }

      dispatch(setUser(data.user));
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  const handleFileSelection =(files)=> {
    const file= files[0]
    const preview= URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }


  if (loading) return <Loading />;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-14 h-14 relative group">
                  <AvatarImage src={filePreview? filePreview : userData?.user?.avatar} />
                  <div className="absolute z-50 w-full h-full top-1/2 
left-1/2 -translate-x-1/2 -translate-y-1/2 
justify-center items-center bg-black bg-opacity-20 
border-2 border-violet-500 rounded-full 
group-hover:flex hidden cursor-pointer" >
                    <IoCameraOutline color="#2563EB" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div className='mb-3'>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-0 h-16 resize-none"
                        placeholder="Enter bio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              </div>
              <div className='mb-3'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password (leave blank to keep current)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
