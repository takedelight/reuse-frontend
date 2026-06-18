"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
} from "@/src/shared/ui";

export default function SecurityPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Ensure your account is using a long, random password to stay secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current_password">Current Password</Label>
              <Input id="current_password" type="password" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="new_password">New Password</Label>
                <Input id="new_password" type="password" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <Input id="confirm_password" type="password" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by requiring more
            than just a password.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="2fa-email" className="flex items-center gap-2">
                <i className="ri-mail-lock-line text-lg leading-none" />{" "}
                Authenticator App / Email Codes
              </Label>
              <span className="text-xs text-muted-foreground">
                Secure your account with 2FA verification codes sent to your
                device or email.
              </span>
            </div>
            <Switch id="2fa-email" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage and sign out of your active sessions on other browsers and
            devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <i className="ri-macbook-line text-2xl text-muted-foreground mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    Chrome on Windows
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Current session
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Kyiv, Ukraine • 192.168.1.1
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <i className="ri-smartphone-line text-2xl text-muted-foreground mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Safari on iPhone
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Lviv, Ukraine • 2 hours ago
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Revoke
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive/5 border-destructive/20"
            >
              Sign Out of All Other Devices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
