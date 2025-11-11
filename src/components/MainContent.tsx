import { Card, CardContent } from "./ui/card";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    id: 1,
    text: "Don't worry, this update is quicker than your internet history deletion!",
  },
  {
    id: 2,
    text: "A majestic bird soars high above a crystal-clear glacial lake, its wings catching the sunlight.",
  },
  {
    id: 3,
    text: "For Wallace the walrus, the perfect day starts with a leisurely swim in the icy Arctic waters",
  },
  {
    id: 4,
    text: "The best time to stretch is whenever your body feels tight or stiff!",
  },
];

export function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1
            className="text-6xl mb-4 font-semibold"
            style={{ color: "#7c3aed" }}
          >
            Welcome, John Doe
          </h1>
          <p className="text-lg text-muted-foreground">
            May I be of assistance today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="hover:shadow-md transition-shadow cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-muted-foreground flex-1">
                    {card.text}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
