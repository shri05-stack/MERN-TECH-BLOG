import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-light.png";
import { TiHomeOutline } from "react-icons/ti";
import { TbCategory2 } from "react-icons/tb";
import { LiaBlogSolid } from "react-icons/lia";
import { GoComment } from "react-icons/go";
import { LuUsersRound } from "react-icons/lu";
import { TbCircleDot } from "react-icons/tb";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector(state => state.user)


  const {
      data: categoryData
    } = useFetch(
      `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
      {
        method: "get",
        credentials: "include",
      },
    );
  return (
    <Sidebar>
      <SidebarHeader className=" bg-white">
        <img src={logo} width={120} />
      </SidebarHeader>
      <SidebarContent className=" bg-white">
        <SidebarGroup />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <TiHomeOutline />
              <Link to={RouteIndex}>Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {user && user.isLoggedIn
          ?<>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LiaBlogSolid />
              <Link to={RouteBlog}>Blogs</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <GoComment />
              <Link to={RouteCommentDetails}>Comments</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          </>
          :
          <></>
        }
        {user && user.isLoggedIn && user.user.role === 'admin'
        ? <>
        <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <TbCategory2 />
                                        <Link to={RouteCategoryDetails}>Categories</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <LuUsersRound />
                                        <Link to={RouteUser}>Users</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }
          
        </SidebarMenu>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroupLabel>Categories</SidebarGroupLabel>
        <SidebarMenu>
          {categoryData && categoryData.category.length>0
          && categoryData.category.map(category => <SidebarMenuItem
          key={(category._id)}>
            <SidebarMenuButton>
              <TbCircleDot />
              <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>)}
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
