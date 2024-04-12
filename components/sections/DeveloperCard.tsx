import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const DeveloperCard = () => {
    return (
        <Card className="w-[450px]">
            <CardHeader className='flex flex-row gap-4 items-center pb-2'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <p className='text-xs text-zinc-500 font-semibold'>United States - 60$/hour</p>
                    <h2 className='font-semibold text-lg'>Fullstack Developer</h2>
                </div>
            </CardHeader>
            <CardContent>
                <div className='flex gap-1 mb-4'>
                    <Badge variant="outline" className='rounded-md'>React</Badge>
                    <Badge variant="outline" className='rounded-md'>Next</Badge>

                </div>

                <p className='text-zinc-500 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse facere rem, totam non asperiores ipsam quis quisquam quae ex neque, doloribus eum perferendis a. Pariatur.</p>
            </CardContent>
            <CardFooter className="flex gap-1">
                <Badge variant="outline" className='rounded-md bg-blue-200'>Full-time</Badge>
                <Badge variant="outline" className='rounded-md bg-blue-200'>Part-time</Badge>
                <Badge variant="outline" className='rounded-md bg-blue-200'>Remote</Badge>
                <Badge variant="outline" className='rounded-md bg-blue-200'>Remote</Badge>
                
            </CardFooter>
        </Card>
    )
}

export default DeveloperCard