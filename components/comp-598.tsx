"use client"
import { checkboxesFeature, hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature } from "@headless-tree/core"
import { useTree } from "@headless-tree/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { EllipsisIcon, Filter, FolderPen, Plus, Search, Trash } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Tree } from "@/components/tree"

interface Student {
  id: number
  name: string
  email: string
  lastActive: string
  dateAdded: string
  avatar: string
}

interface User {
  id: number
  name: string
  email: string
  roles: string[]
  lastActive: string
  dateAdded: string
  avatar: string
  children?: Student[]
}

interface TreeUserItem {
  id: string
  name: string
  email: string
  roles: string[]
  lastActive: string
  dateAdded: string
  avatar: string
  children?: string[]
}

const users: User[] = [
  {
    id: 101,
    name: "Florence Shaw",
    email: "florence@untitledui.com",
    roles: ["Parent"],
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    children: [
      {
        id: 1,
        name: "Chiamaka Okoro",
        email: "chiamaka.okoro@schoolmail.com",
        lastActive: "Mar 4, 2024",
        dateAdded: "July 4, 2022",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      },
    ],
  },
  {
    id: 102,
    name: "Ipaoluwa Ogunneye",
    email: "amelie@untitledui.com",
    roles: ["Parent"],
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    children: [
      {
        id: 2,
        name: "Tunde Balogun",
        email: "tunde.balogun@schoolmail.com",
        lastActive: "Mar 4, 2024",
        dateAdded: "August 12, 2022",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      },
    ],
  },
  {
    id: 103,
    name: "Adebola Wisdom",
    email: "ammar@untitledui.com",
    roles: ["Parent"],
    lastActive: "Mar 2, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    children: [
      {
        id: 3,
        name: "Ngozi Eze",
        email: "ngozi.eze@schoolmail.com",
        lastActive: "Mar 2, 2024",
        dateAdded: "June 9, 2022",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      },
    ],
  },
  {
    id: 104,
    name: "Caitlyn King",
    email: "caitlyn@untitledui.com",
    roles: ["Member", "Parent"],
    lastActive: "Mar 6, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    children: [
      {
        id: 4,
        name: "David Adetayo",
        email: "david.adetayo@schoolmail.com",
        lastActive: "Mar 6, 2024",
        dateAdded: "May 18, 2022",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      },
    ],
  },
]


const usersRecord: Record<string, TreeUserItem> = {}
users.forEach((user) => {
  // override id with string key
  usersRecord[`user-${user.id}`] = {
    ...user,
    id: `user-${user.id}`,  // <--- force string
    children: user.children?.map((child) => `student-${child.id}`) || [],
  }

  user.children?.forEach((child) => {
    usersRecord[`student-${child.id}`] = {
      ...child,
      id: `student-${child.id}`, // <--- force string
      roles: ["Student"],
      children: [],
    }
  })
})

const indent = 20

export default function Component() {
  const tree = useTree<TreeUserItem>({
    initialState: { expandedItems: [] },
    indent,
    rootItemId: "root",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => {
        if (itemId === "root") {
          return {
            id: "root",
            name: "Root",
            email: "",
            roles: [],
            lastActive: "",
            dateAdded: "",
            avatar: "",
            children: Object.keys(usersRecord).filter((key) => key.startsWith("user-")),
          } as TreeUserItem
        }
        return usersRecord[itemId]
      },
      getChildren: (itemId) => {
        if (itemId === "root") {
          return Object.keys(usersRecord).filter((key) => key.startsWith("user-"))
        }
        return usersRecord[itemId]?.children ?? []
      },
    },
    features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
  })


  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr] text-sm font-medium text-zinc-600 bg-zinc-100 rounded-sm p-3 mb-4">
          <div>User name</div>
          <div>Role</div>
          <div>Date added</div>
          <div></div>
        </div>

        <Tree indent={indent} tree={tree}>
          {tree
            .getItems()
            .filter((item) => item.getId() !== "root")
            .map((item) => {
              const user = item.getItemData()
              const isFolder = item.isFolder()
              const isExpanded = item.isExpanded()

              return (
                <div
                  key={item.getId()}
                  className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center p-3 border-b hover:bg-zinc-50 transition-colors duration-150"
                  style={{ paddingLeft: `${item.getItemMeta().level * indent}px` }}
                  role="listitem"
                >
                  <div className="flex items-center gap-3">
                    {isFolder && (
                      <Checkbox
                        checked={isExpanded}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            item.expand()
                          } else {
                            item.collapse()
                          }
                        }}
                      />
                    )}
                    {!isFolder && <div className="w-4" />}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium text-zinc-900">{user.name}</p>
                      <p className="text-zinc-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {user.roles?.map((role: string, i: number) => (
                      <span className="text-xs bg-zinc-200 text-black px-2 py-1 rounded-sm" key={`${i}-${role}`}>
                        {role}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-zinc-600">{user.dateAdded}</div>

                  <div className="ml-auto hover:shadow-xs border rounded-md bg-white">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-sm shadow-none"
                          aria-label="Open edit menu"
                        >
                          <EllipsisIcon className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="-translate-x-8">
                        <DropdownMenuItem>
                          <FolderPen className="h-4 w-4" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:text-red-600/80 focus:text-red-600/80">
                          <Trash className="h-4 w-4 text-red-600 hover:text-red-600/80 focus:text-red-600/80" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
        </Tree>
      </div>
    </div>
  )
}
