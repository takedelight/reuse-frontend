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
  Textarea,
} from "@/src/shared/ui";

export default function SettingsPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your photo and personal details visible on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="size-20 rounded-full bg-muted flex items-center justify-center border border-foreground/10 font-semibold text-xl">
              AN
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button size="sm">Upload new photo</Button>
                <Button size="sm" variant="outline">
                  Delete
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">
                JPG, GIF or PNG. Max size of 2MB.
              </span>
            </div>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="anniko"
                  defaultValue="anniko"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  defaultValue="nikolaenkooleksiy@gmail.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your goals, or your current stack..."
                className="resize-none h-28"
              />
              <span className="text-xs text-muted-foreground text-right">
                0 / 300 characters
              </span>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

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

      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions for your platform account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                Delete Account
              </span>
              <span className="text-xs text-muted-foreground">
                Permanently remove your profile, subscription details, and all
                completed course progress.
              </span>
            </div>
            <Button variant="destructive" className="w-fit shrink-0">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
