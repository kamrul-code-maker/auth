"use client";

import { useState, useTransition } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { Formik, Form, ErrorMessage } from "formik";
import { SettingsSchema, UserRole } from "@/lib/schemas";
import { SettingsSchemaType } from "@/lib/schemas/validations";

// ---------------------
// Mocked types & data
// ---------------------


// Mock current user hook
const useCurrentUser = () => ({
  name: "John Doe",
  email: "john.doe@example.com",
  role: UserRole.USER,
  isOAuth: false,
  isTwoFactorEnabled: true,
});

// Mock settings action
const settings = async (values: SettingsSchemaType) =>
  new Promise<{ success?: string; error?: string }>((resolve) => {
    console.log("Submitted values:", values);
    setTimeout(() => resolve({ success: "Settings saved successfully!" }), 1000);
  });

// ---------------------
// Zod schema + Formik validate function
// ---------------------

// Convert Zod schema to Formik validate function
const validate = (values: SettingsSchemaType) => {
  const result = SettingsSchema.safeParse(values);
  const errors: any = {};
  if (!result.success) {
    result.error.issues.forEach((err) => {
      if (err.path[0]) {
        errors[err.path[0]] = err.message;
      }
    });
  }
  return errors;
};

// ---------------------
// Page component
// ---------------------
const SettingsPage = () => {
  const user = useCurrentUser();
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            password: "",
            newPassword: "",
            role: user.role,
            isTwoFactorEnabled: user.isTwoFactorEnabled,
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            setError(undefined);
            setSuccess(undefined);
            startTransition(() => {
              settings(values)
                .then((data) => {
                  if (data.error) setError(data.error);
                  if (data.success) setSuccess(data.success);
                  setSubmitting(false);
                })
                .catch(() => {
                  setError("Something went wrong!");
                  setSubmitting(false);
                });
            });
          }}
        >
          {({ values, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Name */}
              <div className="space-y-1">
                <label className="font-medium">Name</label>
                <Input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting || isPending}
                  placeholder="John Doe"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Email */}
              {!user.isOAuth && (
                <div className="space-y-1">
                  <label className="font-medium">Email</label>
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting || isPending}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              )}

              {/* Password / New Password */}
              {!user.isOAuth && (
                <>
                  <div className="space-y-1">
                    <label className="font-medium">Current Password</label>
                    <Input
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      disabled={isSubmitting || isPending}
                      placeholder="******"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium">New Password</label>
                    <Input
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      disabled={isSubmitting || isPending}
                      placeholder="******"
                    />
                    <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                  </div>
                </>
              )}

              {/* Role */}
              <div className="space-y-1">
                <label className="font-medium">Role</label>
                <Select
                  value={values.role}
                  onValueChange={(val) => setFieldValue("role", val)}
                  disabled={isSubmitting || isPending}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={UserRole.USER}>User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Two Factor Authentication */}
              {!user.isOAuth && (
                <div className="flex items-center justify-between border p-3 rounded-lg shadow-sm">
                  <div>
                    <label className="font-medium">Two Factor Authentication</label>
                    <p className="text-sm text-gray-500">
                      Enable two factor authentication for your account
                    </p>
                  </div>
                  <Switch
                    checked={values.isTwoFactorEnabled}
                    onCheckedChange={(val) => setFieldValue("isTwoFactorEnabled", val)}
                    disabled={isSubmitting || isPending}
                  />
                </div>
              )}

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button type="submit" disabled={isSubmitting || isPending}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
