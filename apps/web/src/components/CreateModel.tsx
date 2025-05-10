"use client"
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

export const CreateModel = ({ onCancel }: { onCancel: () => void }) => {
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
            //console.log("Response from training", response);
        }
    }

    const onUpload = (url: string) => {
        setZipUrl(url);
    }

    return (
        <Card className="w-full max-w-xl md:w-[40dvw] max-h-[90vh] overflow-y-auto p-4 border-2 border-cyan-400 dark">
            <CardHeader>
                <CardTitle className="mt-3">Create a model</CardTitle>
                <CardDescription>Create a new model in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Name of your model" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="type">Type</Label>
                        <Select onValueChange={(value) => setType(value as TrainModelInput["type"])}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Type of the model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Man">Man</SelectItem>
                                <SelectItem value="Woman">Woman</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="Age of your model" onChange={(e) => setAge(parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="ethnicity">Ethnicity</Label>
                        <Select onValueChange={(value) => setEthnicity(value as TrainModelInput["ethnicity"])}>
                            <SelectTrigger id="ethnicity">
                                <SelectValue placeholder="Ethnicity of the model" />
                            </SelectTrigger>
                            <SelectContent>
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
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="eyeColor">Eye Color</Label>
                        <Select onValueChange={(value) => setEyeColor(value as TrainModelInput["eyeColor"])}>
                            <SelectTrigger id="eyeColor">
                                <SelectValue placeholder="Eye color of the model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Black">Black</SelectItem>
                                <SelectItem value="Brown">Brown</SelectItem>
                                <SelectItem value="Blue">Blue</SelectItem>
                                <SelectItem value="Hazel">Hazel</SelectItem>
                                <SelectItem value="Grey">Grey</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="bald">Bald</Label>
                        <Switch checked={bald} onCheckedChange={setBald} />
                    </div>
                    <Upload onUpload={onUpload} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-2">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    disabled={!type || !ethnicity || !eyeColor || !name || !age || !zipUrl}
                >
                    Create Model
                </Button>
            </CardFooter>
        </Card>
    )
}
