"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Multi-Purpose Calculator</h1>
      <p className="text-center text-lg mb-6 text-muted-foreground">by Shreeyut Saraf</p>
      <Tabs defaultValue="binary" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="binary">Binary</TabsTrigger>
          <TabsTrigger value="unit-conversion">Unit Conversion</TabsTrigger>
          <TabsTrigger value="arithmetic">Arithmetic</TabsTrigger>
        </TabsList>
        <TabsContent value="binary">
          <BinaryCalculator />
        </TabsContent>
        <TabsContent value="unit-conversion">
          <UnitConversionCalculator />
        </TabsContent>
        <TabsContent value="arithmetic">
          <ArithmeticCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BinaryCalculator() {
  const [binary1, setBinary1] = useState("")
  const [binary2, setBinary2] = useState("")
  const [operation, setOperation] = useState("add")
  const [result, setResult] = useState("")

  const calculateBinary = () => {
    const num1 = parseInt(binary1, 2)
    const num2 = parseInt(binary2, 2)
    let calculatedResult

    switch (operation) {
      case "add":
        calculatedResult = (num1 + num2).toString(2)
        break
      case "subtract":
        calculatedResult = (num1 - num2).toString(2)
        break
      case "multiply":
        calculatedResult = (num1 * num2).toString(2)
        break
      case "divide":
        calculatedResult = Math.floor(num1 / num2).toString(2)
        break
      default:
        calculatedResult = "Error"
    }

    setResult(calculatedResult)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Binary Calculator</CardTitle>
        <CardDescription>Perform binary operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="binary1">Binary Number 1</Label>
          <Input
            id="binary1"
            value={binary1}
            onChange={(e) => setBinary1(e.target.value.replace(/[^01]/g, ""))}
            placeholder="Enter binary number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="binary2">Binary Number 2</Label>
          <Input
            id="binary2"
            value={binary2}
            onChange={(e) => setBinary2(e.target.value.replace(/[^01]/g, ""))}
            placeholder="Enter binary number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="operation">Operation</Label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </div>
        <Button onClick={calculateBinary}>Calculate</Button>
        {result && (
          <div className="mt-4">
            <Label>Result</Label>
            <div className="text-2xl font-bold">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function UnitConversionCalculator() {
  const [value, setValue] = useState("")
  const [fromUnit, setFromUnit] = useState("kg")
  const [toUnit, setToUnit] = useState("g")
  const [result, setResult] = useState("")

  const convertUnit = () => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setResult("Invalid input")
      return
    }

    let calculatedResult

    switch (`${fromUnit}-${toUnit}`) {
      case "kg-g":
        calculatedResult = numValue * 1000
        break
      case "g-kg":
        calculatedResult = numValue / 1000
        break
      case "l-ml":
        calculatedResult = numValue * 1000
        break
      case "ml-l":
        calculatedResult = numValue / 1000
        break
      default:
        calculatedResult = numValue // Same unit, no conversion needed
    }

    setResult(`${calculatedResult} ${toUnit}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Conversion Calculator</CardTitle>
        <CardDescription>Convert between different units</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fromUnit">From Unit</Label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="l">Liter (L)</option>
              <option value="ml">Milliliter (mL)</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toUnit">To Unit</Label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="l">Liter (L)</option>
              <option value="ml">Milliliter (mL)</option>
            </select>
          </div>
        </div>
        <Button onClick={convertUnit}>Convert</Button>
        {result && (
          <div className="mt-4">
            <Label>Result</Label>
            <div className="text-2xl font-bold">{result}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ArithmeticCalculator() {
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState("")

  const appendToExpression = (value: string) => {
    setExpression((prev) => prev + value)
  }

  const calculateResult = () => {
    try {
      // Using eval here for simplicity. In a production environment, use a safer alternative.
      const calculatedResult = eval(expression)
      setResult(calculatedResult.toString())
    } catch (error) {
      setResult("Error")
    }
  }

  const clearExpression = () => {
    setExpression("")
    setResult("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Arithmetic Calculator</CardTitle>
        <CardDescription>Perform basic arithmetic operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input value={expression} readOnly className="text-right text-2xl" />
        {result && <div className="text-right text-3xl font-bold">{result}</div>}
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
            <Button
              key={btn}
              onClick={() => (btn === "=" ? calculateResult() : appendToExpression(btn))}
              className="text-xl p-4"
            >
              {btn}
            </Button>
          ))}
        </div>
        <Button onClick={clearExpression} className="w-full">
          Clear
        </Button>
      </CardContent>
    </Card>
  )
}