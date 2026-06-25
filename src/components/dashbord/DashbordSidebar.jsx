

import {Bars, Bookmark, ChartAreaStacked, Circles3Plus, CodeFork, Factory, FloppyDisk, FolderPlus, Gear, House, Magnifier, ObjectsAlignBottom, ObjectsAlignJustifyHorizontal, Person, Persons} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { link } from "framer-motion/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
export default async function DashbordSidebar() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user
    const role = user?.role || creator
    console.log(user)
    const dashboardItems={
        user:[
            { icon:Person,label:"My Profile",link:'/dashboard/user'},
            { icon:Bookmark,label:"My Prompts",link:'/dashboard/user/My Prompts'},
            { icon:FloppyDisk,label:"Saved Prompts",link:'/dashboard/user/Saved Prompts'},
            { icon:FolderPlus,label:"Add Prompt",link:'/dashboard/user/Add Prompt'},
            { icon:Circles3Plus,label:"My Reviews",link:'/dashboard/user/My Reviews'},
          
        ],

        creator:[
            { icon:Person,label:"My Profile",link:'/dashboard/creator'},
            { icon:FolderPlus,label:"Creator Dashboard Home",link:'/dashboard/creator/Creator Dashboard Home'},
            { icon: Bookmark,label:"Add Prompt",link:'/dashboard/creator/Add Prompt'},
            { icon:FloppyDisk,label:"My Prompts",link:'/dashboard/creator/My Prompts'},
            
          
        ],

         admin:[
            { icon:Persons,label:"My Profile",link:'/dashboard/admin'},
            { icon:ObjectsAlignBottom,label:"All Users",link:'/dashboard/admin/All Users'},
            { icon:ObjectsAlignJustifyHorizontal,label:"All Prompts",link:'/dashboard/admin/All Prompts'},
            { icon:ChartAreaStacked,label:"All Payments",link:'/dashboard/admin/All Payments'},
            { icon:Factory,label:"Reported Prompts",link:'/dashboard/admin/Reported Prompts'},
            { icon:CodeFork,label:"Analytics",link:'/dashboard/admin/Analytics'},
          
        ],
    }

 const navItems= dashboardItems[role ]
//   const navItems= [
//     {icon: House, label: "Home"},
//     {icon: Magnifier, label: "Search"},
//     {icon: Bell, label: "Notifications"},
//     {icon: Envelope, label: "Messages"},
//     {icon: Person, label: "Profile"},
//     {icon: Gear, label: "Settings"},
//   ];

  return (
    <Drawer>
      <Button className={'hiden sm:block'} variant="secondary">
        <Bars />
        Menu
      </Button>

      <nav className="flex flex-col gap-1 w-[200] border border-right-1 pt-7 text-gray-900 ">
            {/* <Image
            src={'logo-xl.png'}
            height={'100'}
            width={'100'}
            className="h-10"
            alt=""
            
            /> */}
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>


      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
