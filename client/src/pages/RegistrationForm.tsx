import React, { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Errors = Record<string, string>;

const Index = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // Card 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState<Date>();
  const [gender, setGender] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");

  // Card 2
  const [localAddress, setLocalAddress] = useState("");
  const [sameAsLocal, setSameAsLocal] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState("");

  // Card 3
  const [aadharFront, setAadharFront] = useState<string | null>(null);
  const [aadharBack, setAadharBack] = useState<string | null>(null);
  const [aadharFrontFile, setAadharFrontFile] = useState<File | null>(null);
  const [aadharBackFile, setAadharBackFile] = useState<File | null>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  // Card 4
  const [profession, setProfession] = useState("student");
  const [qualification, setQualification] = useState("");
  const [qualYear, setQualYear] = useState("");
  const [college, setCollege] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");

  // Card 5
  const [course, setCourse] = useState("");
  const [referral, setReferral] = useState("");
  const [friendName, setFriendName] = useState("");
  const [tcChecked, setTcChecked] = useState(false);
  const [openTc, setOpenTc] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);




  const handleSameAsLocal = (checked: boolean) => {
    setSameAsLocal(checked);
    if (checked) {
      setPermanentAddress(localAddress);
    }
  };

  const handleLocalChange = (val: string) => {
    setLocalAddress(val);
    if (sameAsLocal) setPermanentAddress(val);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string | null) => void,
    fileSetter?: (file: File | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Max file size is 5MB",
          variant: "destructive",
        });
        return;
      }
      fileSetter?.(file);
      const reader = new FileReader();
      reader.onload = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validate = (): Errors => {
    const e: Errors = {};

    if (!name.trim()) e.name = "Name is required";
    else if (name.trim().length > 100)
      e.name = "Name must be under 100 characters";

    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Invalid email address";

    if (!phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit phone number";

    if (!dob) e.dob = "Date of birth is required";

    if (!gender) e.gender = "Gender is required";

    if (!fatherName.trim()) e.fatherName = "Father's name is required";

    if (!fatherPhone.trim()) e.fatherPhone = "Father's phone is required";
    else if (!/^\d{10}$/.test(fatherPhone.replace(/\s/g, "")))
      e.fatherPhone = "Enter a valid 10-digit number";

    if (!localAddress.trim()) e.localAddress = "Local address is required";

    if (!sameAsLocal && !permanentAddress.trim())
      e.permanentAddress = "Permanent address is required";

    if (!aadharFront) e.aadharFront = "Aadhar front image is required";
    if (!aadharBack) e.aadharBack = "Aadhar back image is required";

    if (profession === "student") {
      if (!qualification.trim()) e.qualification = "Qualification is required";
      if (!qualYear.trim()) e.qualYear = "Year is required";
      else if (!/^\d{4}$/.test(qualYear)) e.qualYear = "Enter a valid year";
      if (!college.trim()) e.college = "College is required";
    } else {
      if (!designation.trim()) e.designation = "Designation is required";
      if (!company.trim()) e.company = "Company is required";
    }

    if (!course) e.course = "Please select a course";

    if (!referral) e.referral = "Please select how you heard about us";
    if (referral === "friend" && !friendName.trim())
      e.friendName = "Friend name is required";

    return e;
  };

  const validationErrors = useMemo(
    () => validate(),
    [
      name,
      email,
      phone,
      dob,
      gender,
      fatherName,
      fatherPhone,
      localAddress,
      sameAsLocal,
      permanentAddress,
      aadharFront,
      aadharBack,
      profession,
      qualification,
      qualYear,
      college,
      designation,
      company,
      course,
      referral,
      friendName,
    ],
  );

  const isFormValid = Object.keys(validationErrors).length === 0 && tcChecked;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const currentErrors = validate();
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0 || !tcChecked) {
      toast({
        title: "Validation Error",
        description: "Please fix the highlighted fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name,
        email,
        phone,
        dob: dob ? dob.toISOString() : null,
        gender,
        fatherName,
        fatherPhone,
        localAddress,
        sameAsLocal,
        permanentAddress,
        aadharFront,
        aadharBack,
        profession,
        qualification,
        qualYear,
        college,
        designation,
        company,
        course,
        referral,
        friendName,
        tcAccepted: tcChecked,
      };

      const res = await fetch("/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to submit registration");
      }

      toast({
        title: "Registration Submitted!",
        description: "Your registration has been received successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission Failed",
        description:
          err instanceof Error ? err.message : "Unable to submit right now.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FieldError = ({ field }: { field: string }) => {
    if (!submitted || !errors[field]) return null;
    return <p className="text-sm text-destructive mt-1">{errors[field]}</p>;
  };

  const hasError = (field: string) => submitted && !!errors[field];
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-8 sm:py-12 px-3 sm:px-4">
        <div className="mx-auto p-[60px]">
          <h1 className="mb-2 text-center text-3xl sm:text-4xl font-bold text-foreground">
            Registration <span className="text-primary">Form</span>
          </h1>
          <p className="mb-6 sm:mb-8 text-center text-sm sm:text-base text-muted-foreground">
            Fill in your details to register
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Card 1 — Personal Details */}
            <Card className="shadow-lg ">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg font-semibold text-card-foreground">
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-card-foreground">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={cn(hasError("name") && "border-destructive")}
                    />
                    <FieldError field="name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-card-foreground">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(hasError("email") && "border-destructive")}
                    />
                    <FieldError field="email" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-card-foreground">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={cn(hasError("phone") && "border-destructive")}
                    />
                    <FieldError field="phone" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-card-foreground">
                      Date of Birth <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          name="dob"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dob && "text-muted-foreground",
                            hasError("dob") && "border-destructive",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FieldError field="dob" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-card-foreground">
                      Gender <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                      name="gender"
                      value={gender}
                      onValueChange={setGender}
                      className="flex flex-wrap gap-4 sm:gap-6"
                    >
                      {["Male", "Female", "Other"].map((g) => (
                        <div key={g} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={g.toLowerCase()}
                            id={`gender-${g}`}
                          />
                          <Label
                            htmlFor={`gender-${g}`}
                            className="text-card-foreground font-normal cursor-pointer"
                          >
                            {g}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <FieldError field="gender" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-card-foreground">
                      Father's Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      placeholder="Father's Name"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      className={cn(
                        hasError("fatherName") && "border-destructive",
                      )}
                    />
                    <FieldError field="fatherName" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-card-foreground">
                      Father's Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Father's Phone"
                      value={fatherPhone}
                      onChange={(e) => setFatherPhone(e.target.value)}
                      className={cn(
                        hasError("fatherPhone") && "border-destructive",
                      )}
                    />
                    <FieldError field="fatherPhone" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 — Address Details */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg font-semibold text-card-foreground">
                  Address Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-card-foreground">
                    Local Address <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    name="localAddress"
                    placeholder="Enter local address"
                    value={localAddress}
                    onChange={(e) => handleLocalChange(e.target.value)}
                    className={cn(
                      hasError("localAddress") && "border-destructive",
                    )}
                  />
                  <FieldError field="localAddress" />
                </div>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={sameAsLocal}
                    onCheckedChange={handleSameAsLocal}
                  />
                  <Label className="text-card-foreground font-normal cursor-pointer">
                    Same as Local Address
                  </Label>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-card-foreground">
                    Permanent Address{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    name="permanentAddress"
                    placeholder="Enter permanent address"
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    disabled={sameAsLocal}
                    className={cn(
                      sameAsLocal ? "opacity-60" : "",
                      hasError("permanentAddress") && "border-destructive",
                    )}
                  />
                  <FieldError field="permanentAddress" />
                </div>
              </CardContent>
            </Card>

            {/* Card 3 — Aadhar Card Upload */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg font-semibold text-card-foreground">
                  Aadhar Card Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      label: "Aadhar Card (Front)",
                      value: aadharFront,
                      setter: setAadharFront,
                      fileSetter: setAadharFrontFile,
                      ref: frontRef,
                      key: "aadharFront",
                      name: "aadharFront",
                    },
                    {
                      label: "Aadhar Card (Back)",
                      value: aadharBack,
                      name: "aadharBack",
                      setter: setAadharBack,
                      fileSetter: setAadharBackFile,
                      ref: backRef,
                      key: "aadharBack",
                    },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1.5">
                      <Label className="text-card-foreground">
                        {item.label} <span className="text-destructive">*</span>
                      </Label>
                      <input
                        // name="aadharFront"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={item.ref}
                        onChange={(e) =>
                          handleImageUpload(e, item.setter, item.fileSetter)
                        }
                      />
                      {item.value ? (
                        <div className="relative rounded-lg border border-border overflow-hidden">
                          <img
                            src={item.value}
                            alt={item.label}
                            className="w-full h-36 sm:h-40 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              item.setter(null);
                              item.fileSetter?.(null);
                            }}
                            className="absolute top-2 right-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:opacity-80"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => item.ref.current?.click()}
                          className={cn(
                            "flex h-36 sm:h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-primary hover:bg-accent/50",
                            hasError(item.key)
                              ? "border-destructive bg-destructive/5"
                              : "border-border bg-accent/30",
                          )}
                        >
                          <Upload className="mb-2 h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload
                          </span>
                        </div>
                      )}
                      <FieldError field={item.key} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Card 4 — Professional Details */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg font-semibold text-card-foreground">
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={profession}
                  onValueChange={setProfession}
                  className="flex flex-wrap gap-4 sm:gap-6"
                >
                  {[
                    { value: "student", label: "Student" },
                    { value: "professional", label: "Working Professional" },
                  ].map((opt) => (
                    <div
                      key={opt.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={opt.value}
                        id={`prof-${opt.value}`}
                      />
                      <Label
                        htmlFor={`prof-${opt.value}`}
                        className="text-card-foreground font-normal cursor-pointer"
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {profession === "student" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-lg border border-border p-3 sm:p-4">
                    <div className="space-y-1.5">
                      <Label className="text-card-foreground">
                        Qualification{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        name="qualification"
                        placeholder="e.g. B.Tech"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className={cn(
                          hasError("qualification") && "border-destructive",
                        )}
                      />
                      <FieldError field="qualification" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-card-foreground">
                        Year <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        name="qualYear"
                        placeholder="e.g. 2024"
                        value={qualYear}
                        onChange={(e) => setQualYear(e.target.value)}
                        className={cn(
                          hasError("qualYear") && "border-destructive",
                        )}
                      />
                      <FieldError field="qualYear" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-card-foreground">
                        College <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        name="college"
                        placeholder="College Name"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        className={cn(
                          hasError("college") && "border-destructive",
                        )}
                      />
                      <FieldError field="college" />
                    </div>
                  </div>
                )}

                {profession === "professional" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg border border-border p-3 sm:p-4">
                    <div className="space-y-1.5">
                      <Label className="text-card-foreground">
                        Designation <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        name="designation"
                        placeholder="Your Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className={cn(
                          hasError("designation") && "border-destructive",
                        )}
                      />
                      <FieldError field="designation" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-card-foreground">
                        Company <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        name="company"
                        placeholder="Company Name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={cn(
                          hasError("company") && "border-destructive",
                        )}
                      />
                      <FieldError field="company" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Card 5 — Course & Referral */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg font-semibold text-card-foreground">
                  Course & Referral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-card-foreground">
                    Course <span className="text-destructive">*</span>
                  </Label>
                  <Select name="course" value={course} onValueChange={setCourse}>
                    <SelectTrigger
                      className={cn(hasError("course") && "border-destructive")}
                    >
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Full Stack Development",
                        "Frontend Development",
                        "Backend Development",
                        "Data Science",
                        "Machine Learning",
                        "DevOps",
                      ].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError field="course" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-card-foreground">
                    How did you hear about us?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    name="referral"
                    value={referral}
                    onValueChange={setReferral}
                    className="flex flex-wrap gap-3 sm:gap-4"
                  >
                    {[
                      "Google",
                      "College/TPO",
                      "LinkedIn",
                      "Instagram",
                      "Friend",
                    ].map((r) => (
                      <div key={r} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={r.toLowerCase()}
                          id={`ref-${r}`}
                        />
                        <Label
                          htmlFor={`ref-${r}`}
                          className="text-card-foreground font-normal cursor-pointer text-sm sm:text-base"
                        >
                          {r}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <FieldError field="referral" />
                </div>
                {referral === "friend" && (
                  <div className="space-y-1.5">
                    <Input
                      name="friendName"
                      placeholder="Friend Name"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      className={cn(
                        hasError("friendName") && "border-destructive",
                      )}
                    />
                    <FieldError field="friendName" />
                  </div>
                )}


              </CardContent>
            </Card>

            <div className="pt-2">
              <div className="rounded-lg border border-border p-4 sm:p-5 space-y-3">
                <p className="text-sm font-semibold text-card-foreground">
                  Terms & Conditions
                </p>
                <div className="flex items-start space-x-3">
                  {/* <Checkbox
                    checked={tcChecked}
                    onCheckedChange={() => {
                      setOpenTc(true);
                    }}
                    id="tc-checkbox"
                  /> */}


                  <Checkbox
                    checked={tcChecked}
                    onCheckedChange={(val) => {
                      setTcChecked(Boolean(val));
                      setOpenTc(true);
                    }}
                  />
                  <div className="text-sm text-card-foreground leading-snug">
                    <label htmlFor="tc-checkbox" className="cursor-pointer">
                      I agree to the{" "}
                      <a
                        href="#terms"
                        className="text-primary font-medium underline underline-offset-4 hover:opacity-90"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTc(true);
                        }}
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <Dialog open={openTc} onOpenChange={setOpenTc}>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Terms & Conditions</DialogTitle>
                    <DialogDescription>
                      Please read and accept our terms to proceed with registration.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto text-sm text-muted-foreground space-y-4 pt-2">
                    <p>
                      By registering you agree to abide by the rules and policies of the institute. You confirm that
                      the information provided is true and accurate to the best of your knowledge.
                    </p>
                    <p>
                      Fee, refund and attendance policies apply as per the course specific guidelines. Any
                      fraudulent activity may lead to cancellation of registration.
                    </p>
                    <p>
                      Personal data will be processed in accordance with our privacy practices.
                    </p>
                  </div>
                  <DialogFooter className="gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTcChecked(false);
                        setOpenTc(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setTcChecked(true);
                        setOpenTc(false);
                      }}
                    >
                      Agree
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-base sm:text-lg font-semibold"
              disabled={!isFormValid || isSubmitting}
            >
              Submit Registration
            </Button> */}

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-base sm:text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
