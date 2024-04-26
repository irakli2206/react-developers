
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getProfileByID, getProfileData } from '@/app/action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Bird, BriefcaseBusiness, Building, CalendarCheck, CircleCheck, CircleX, Copy, Hourglass, Laptop, Lock, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Profile } from '@/types/database.types';
import moment from 'moment'
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import DeveloperView from './_components/view';
import Loading from '@/app/loading';

type Params = {
    developer: string
}

type Props = {
    params: Params
}

const Developer = async ({ params }: Props) => {
    const loggedUser = await getProfileData()
    const profile = await getProfileByID(params.developer as string);
 



    return (
        <Suspense fallback={<Loading />}>
            <DeveloperView loggedUser={loggedUser} profile={profile} />
        </Suspense>
    );
}





export default Developer