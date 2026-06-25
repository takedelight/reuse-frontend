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
import { SessionsList } from "@/src/widgets/profile/sessions-list";

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
          <form className="flex flex-col gap-4">
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

      <SessionsList />
    </div>
  );
}
