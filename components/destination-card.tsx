import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // add a subtle location badge
import type { Destination } from "@/lib/types"

export function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="h-40 w-full">
        <img
          src={dest.heroImage || "/placeholder.svg"}
          alt={`Scenic view of ${dest.name}`}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-balance">{dest.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{dest.location}</Badge>
          <span className="text-muted-foreground">~ ${dest.estimatedPrice}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-muted-foreground">{dest.shortDescription}</p>
        <div className="mt-3 flex items-center justify-between">
          <Link
            href={`/destinations/${dest.slug}`}
            className="text-primary underline-offset-4 hover:underline"
            aria-label={`Open ${dest.name} guide`}
          >
            View guide
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
