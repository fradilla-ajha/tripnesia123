import Image from "next/image"
import type { Activity } from "@/lib/types"

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{activity.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{activity.summary}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-primary font-bold">${activity.price}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {activity.destinationSlug.replace("-", " ")}
          </span>
        </div>
      </div>
    </div>
  )
}
