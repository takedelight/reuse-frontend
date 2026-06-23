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
import { ProfileDangerZone } from "@/src/widgets/profile/profile-danger-zone";
import { ProfileInfo } from "@/src/widgets/profile/profile-info";

export default function SettingsPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <ProfileInfo />

      <Card>
        <CardHeader>
          <CardTitle>Social Accounts</CardTitle>
          <CardDescription>
            Link your profiles so other students and mentors can find your work.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="github" className="flex items-center gap-2">
              <i className="ri-github-fill text-lg leading-none" /> GitHub
              Username
            </Label>
            <Input id="github" placeholder="your-username" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <i className="ri-linkedin-box-fill text-lg leading-none" />{" "}
              LinkedIn Profile URL
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="website" className="flex items-center gap-2">
              <i className="ri-global-line text-lg leading-none" /> Personal
              Website
            </Label>
            <Input id="website" placeholder="https://yourwebsite.dev" />
          </div>

          <div className="flex justify-end">
            <Button>Update Links</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform Preferences</CardTitle>
          <CardDescription>
            Manage how you want to receive alerts and code review updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="review-notifs">Code Review Notifications</Label>
              <span className="text-xs text-muted-foreground">
                Receive instant alerts when a mentor checks your task.
              </span>
            </div>
            <Switch id="review-notifs" defaultChecked />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="email-marketing">Email Digests & Marketing</Label>
              <span className="text-xs text-muted-foreground">
                Get weekly summaries of your progress and platform updates.
              </span>
            </div>
            <Switch id="email-marketing" />
          </div>
        </CardContent>
      </Card>

      <ProfileDangerZone />
    </div>
  );
}
