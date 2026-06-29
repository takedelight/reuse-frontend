import { UserSummary } from "@/src/entity/user";
import { Card, CardContent, CardHeader } from "@/src/shared/ui";
import { cookies } from "next/headers";

export const ProfileCard = async () => {
  const user = (await cookies()).get("user")?.value
    ? JSON.parse((await cookies()).get("user")?.value as string)
    : null;
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <UserSummary
          classNames={{
            avatar: "size-22",
            fallback: "text-3xl",
            username: "text-lg",
            email: "text-sm",
          }}
          user={user}
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-6">
        {/* БЛОК 1: ТАРУФНИЙ ПЛАН ТА ЛІМІТИ ПЕРЕВІРОК */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Subscription & Limits
          </h3>
          <div className="w-full h-24 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
            {/* Тут буде: Рівень підписки, прогрес-бар доступних рев'ю (наприклад, 2/5 залишилось) */}
            [Subscription Level & Code Review Limits]
          </div>
        </div>

        {/* СІТКА ДЛЯ СТАТИСТИКИ (2 колонки на великих екранах) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* БЛОК 2: ГЕЙМІФІКАЦІЯ (СТРІК, ДОСВІД, РІВЕНЬ) */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Gamification & Progress
            </h3>
            <div className="w-full h-32 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
              {/* Тут буде: Вогник стріку 🔥, поточний XP, рівень користувача */}
              [Streak 🔥, XP Progress, Current Level]
            </div>
          </div>

          {/* БЛОК 3: МАТРИЦЯ НАВИЧОК (SKILL TREE) */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Skill Matrix
            </h3>
            <div className="w-full h-32 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
              {/* Тут буде: Прогрес по технологіях (React, TS, Node тощо), підтверджений менторами */}
              [Tech Stack Levels - HTML/CSS/JS/TS/React]
            </div>
          </div>
        </div>

        {/* БЛОК 4: МЕНТОРСЬКА ПАНЕЛЬ (З'ЯВЛЯЄТЬСЯ ЯКЩО ЮЗЕР — МЕНТОР) */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Mentor Dashboard (Conditional)
          </h3>
          <div className="w-full h-28 rounded-lg border border-dashed border-destructive/30 bg-destructive/5 flex items-center justify-center text-xs text-muted-foreground">
            {/* Тут буде: Баланс заробітку, черга тасків на перевірку, кнопка виведення коштів */}
            [Mentor Stats: Earnings, Reviews Queue, Payout Button]
          </div>
        </div>

        {/* БЛОК 5: СТАТУС ПОТОЧНОЇ ПЕРЕВІРКИ КОДУ */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Active Tasks & Code Reviews
          </h3>
          <div className="w-full h-24 rounded-lg border border-dashed border-foreground/20 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
            {/* Тут буде: Картка таски, яку учень відправив ментору (Статус: На перевірці / Потребує виправлень) */}
            [Active Code Review Status & Mentor Feedback Link]
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
