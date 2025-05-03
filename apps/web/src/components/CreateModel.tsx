"use client"
import { useRouter } from "next/navigation"
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
import { Switch } from "@/components/ui/switch"
import { Upload } from "@/components/ui/upload"
import { trainModel } from "@/lib/api"
import { TrainModelInput } from "common/inferred"
import { useAuth } from "@clerk/nextjs"
import { useState } from "react"



export const CreateModel = () => {
    const { getToken } = useAuth();
    const [type, setType] = useState<TrainModelInput["type"]>("Man");
    const [age, setAge] = useState<TrainModelInput["age"]>(0);
    const [ethnicity, setEthnicity] = useState<TrainModelInput["ethnicity"]>("White");
    const [eyeColor, setEyeColor] = useState<TrainModelInput["eyeColor"]>("Black");
    const [bald, setBald] = useState<TrainModelInput["bald"]>(false);
    const [zipUrl, setZipUrl] = useState<string>("");
    const [name, setName] = useState<string>("");

    const input: TrainModelInput = {
        name,
        type,
        age,
        ethnicity,
        eyeColor,
        bald,
        zipUrl
    }

    const handleSubmit = async () => {
        const token = await getToken();
        if (token) {
            const response = await trainModel(input, token);
            console.log("Response from training", response);
        }
    }

    const onUpload = (url: string) => {
        setZipUrl(url);
        console.log("Zip URL", url);
    }

    const router = useRouter();

    return (
        <Card className="w-full max-h-full overflow-auto dark">
            <CardHeader>
                <CardTitle>Create a model</CardTitle>
                <CardDescription>Create a new model in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Name of your model" onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="Gender">Type</Label>
                        <Select onValueChange={(value: TrainModelInput["type"]) => { setType(value) }}>
                            <SelectTrigger id="Type">
                                <SelectValue placeholder="Type of the model" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="Man">Man</SelectItem>
                                <SelectItem value="Woman">Woman</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Age</Label>
                        <Input id="name" type="number" placeholder="Age of your model" onChange={(e) => { setAge(parseInt(e.target.value) || 0) }} />
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="ethnicity">Ethnicity</Label>
                        <Select onValueChange={(value: TrainModelInput["ethnicity"]) => { setEthnicity(value) }
                        }>
                            <SelectTrigger id="framework">
                                <SelectValue placeholder="Ethnicity of the model" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="White">White</SelectItem>
                                <SelectItem value="Black">Black</SelectItem>
                                <SelectItem value="Asian_American">Asian American</SelectItem>
                                <SelectItem value="East_Asian">East Asian</SelectItem>
                                <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                                <SelectItem value="South_Asian">South Asian</SelectItem>
                                <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                                <SelectItem value="Hispanic">Hispanic</SelectItem>
                                <SelectItem value="Pacific">Pacific</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="eyeColor">Eye Color</Label>
                        <Select onValueChange={(value: TrainModelInput["eyeColor"]) => { setEyeColor(value) }}>
                            <SelectTrigger id="eyeColor">
                                <SelectValue placeholder="Eye color of the model" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="Black">Black</SelectItem>
                                <SelectItem value="Brown">Brown</SelectItem>
                                <SelectItem value="Blue">Blue</SelectItem>
                                <SelectItem value="Hazel">Hazel</SelectItem>
                                <SelectItem value="Grey">Grey</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="bald">Bald</Label>
                        <Switch onClick={() => { setBald(!bald) }} />
                    </div>
                    <Upload onUpload={onUpload} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={() => { router.push("/") }}>Cancel</Button>
                <Button onClick={handleSubmit} disabled={!type || !ethnicity || !eyeColor || !name || !age || !zipUrl}>Create Model</Button>
            </CardFooter>
        </Card>
    )
}