import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const BecomeEmployerOffer = () => {
    return (
        <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Start Hiring</CardTitle>
                <CardDescription>
                    Unlock all features and get unlimited access to our developer database.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                    Upgrade
                </Button>
            </CardContent>
        </Card>

    )
}

export default BecomeEmployerOffer