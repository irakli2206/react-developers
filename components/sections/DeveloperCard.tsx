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
import classNames from "classnames"
import Link from "next/link"
import { ProfileT } from "@/types/general"
import { CircleCheck, CircleCheckBig } from "lucide-react"
import { Profile } from "@/types/database.types"

type Props = Profile & {
    isDisabled: boolean
    onCardClick?: () => void
}

const DeveloperCard = ({ id, title, hourly_rate, skills, bio, remote, on_site, employment, freelance, country, role_levels, available, isDisabled, onCardClick }: Props) => {
    const terms = [on_site && 'On-site', remote && 'Remote', employment && 'Employment', freelance && 'Freelance'].filter(e => Boolean(e) !== false) as string[]
    return (
        <Link href={`developers/${id}`} className={classNames("z-0", {
            "pointer-events-none": isDisabled
        })}>
            <Card
                onClick={onCardClick}
                className={classNames("w-full cursor-pointer hover:drop-shadow-md transition", {
                    "pointer-events-none": isDisabled
                })}>
                <CardHeader className='flex flex-row gap-4 items-center pb-2'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 justify-between w-full">
                        <p className='text-xs text-zinc-500 font-semibold'>{country} {hourly_rate && `- $${hourly_rate}/hour`}</p>
                        <h2 className='font-semibold text-lg'>{title}</h2>
                    </div>
                    {available && <div className="text-green-500 self-start flex items-center gap-1">Available <CircleCheck width={18} className='fill-green-200 text-green-500' /></div>}
                </CardHeader>
                <CardContent>
                    <div className='flex gap-1 mb-4'>
                        {skills ? skills.map(skill => <Badge key={skill}  variant="default" className='rounded-md pointer-events-none'>{skill}</Badge>) : null}
                    </div>

                    <p className='text-zinc-500 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse facere rem, totam non asperiores ipsam quis quisquam quae ex neque, doloribus eum perferendis a. Pariatur.</p>
                </CardContent>
                <CardFooter className="flex gap-1">
                    {terms.map(term => <Badge key={term} variant="outline" className='rounded-md '>{term}</Badge>)}
                </CardFooter>
            </Card>
        </Link>
    )
}

export default DeveloperCard