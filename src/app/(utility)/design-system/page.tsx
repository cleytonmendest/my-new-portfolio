import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
};

// Class names are written out in full so Tailwind can see them.
const surfaces = [
  { name: 'background', className: 'bg-background text-foreground border' },
  { name: 'card', className: 'bg-card text-card-foreground border' },
  { name: 'muted', className: 'bg-muted text-muted-foreground' },
  { name: 'primary', className: 'bg-primary text-primary-foreground' },
  { name: 'accent', className: 'bg-accent text-accent-foreground' },
  { name: 'destructive', className: 'bg-destructive text-destructive-foreground' },
  { name: 'success', className: 'bg-success text-success-foreground' },
  { name: 'paper', className: 'bg-paper text-ink border' },
];

const textRoles = [
  { name: 'foreground', className: 'text-foreground' },
  { name: 'muted-foreground', className: 'text-muted-foreground' },
  { name: 'accent-ink (accent as text)', className: 'text-accent-ink' },
  { name: 'destructive', className: 'text-destructive' },
  { name: 'success', className: 'text-success' },
];

const buttonVariants = ['default', 'accent', 'secondary', 'outline', 'ghost', 'link', 'destructive'] as const;
const badgeVariants = ['default', 'accent', 'secondary', 'outline', 'destructive'] as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Specimen({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold">Theme: {theme}</h2>

      <Block title="Colour roles">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {surfaces.map((surface) => (
            <div key={surface.name} className={`rounded-control p-3 text-sm ${surface.className}`}>
              <div className="h-10" />
              {surface.name}
            </div>
          ))}
        </div>
        <ul className="space-y-1 text-sm">
          {textRoles.map((role) => (
            <li key={role.name} className={role.className}>
              Text on background: {role.name}
            </li>
          ))}
        </ul>
        <div className="flex gap-3 text-sm">
          <div className="rounded-control border border-border p-3">border (decorative lines)</div>
          <div className="rounded-control border border-input p-3">input (control border, 3:1)</div>
        </div>
      </Block>

      <Block title="Typography">
        <p className="text-display font-sans font-bold">Cleyton</p>
        <div className="space-y-1 font-sans text-3xl font-bold">
          <p className="font-stretch-condensed">Archivo condensed, width axis</p>
          <p>Archivo normal, width axis</p>
          <p className="font-stretch-expanded">Archivo expanded, width axis</p>
        </div>
        <p className="max-w-prose font-serif text-lg leading-relaxed">
          Source Serif 4 carries long text: biographies, case studies and legal pages. It covers
          Portuguese diacritics such as ã, ç, é and ô, and sets comfortably under 80 characters
          per line.
        </p>
        <p className="font-sans text-sm text-muted-foreground">Interface text uses Archivo at small sizes.</p>
      </Block>

      <Block title="Radius by role">
        <div className="flex items-end gap-4 text-sm">
          <div className="flex h-16 w-24 items-center justify-center rounded-control border border-input">control</div>
          <div className="flex h-16 w-24 items-center justify-center rounded-media border border-input">media</div>
          <div className="flex h-16 w-24 items-center justify-center rounded-full border border-input">pill</div>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap gap-3">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">small</Button>
          <Button>default</Button>
          <Button size="lg">large</Button>
          <Button size="icon" aria-label="Send">
            <Send />
          </Button>
          <Button variant="accent">
            <Mail /> With icon
          </Button>
          <Button disabled>disabled</Button>
        </div>
      </Block>

      <Block title="Badges">
        <div className="flex flex-wrap gap-3">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </Block>

      <Block title="Fields">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`name-${theme}`}>Name</Label>
            <Input id={`name-${theme}`} placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`email-${theme}`}>Email (invalid)</Label>
            <Input id={`email-${theme}`} aria-invalid="true" defaultValue="not-an-email" />
            <p className="text-sm text-destructive">Enter a valid email address.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`select-${theme}`}>Select</Label>
            <Select defaultValue="en">
              <SelectTrigger id={`select-${theme}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <Checkbox id={`check-${theme}`} defaultChecked />
            <Label htmlFor={`check-${theme}`}>Checkbox</Label>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`message-${theme}`}>Message</Label>
          <Textarea id={`message-${theme}`} placeholder="Tell me about your project" />
        </div>
      </Block>

      <Block title="Tabs, card and separator">
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">First</TabsTrigger>
            <TabsTrigger value="two">Second</TabsTrigger>
          </TabsList>
          <TabsContent value="one">First panel.</TabsContent>
          <TabsContent value="two">Second panel.</TabsContent>
        </Tabs>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Cards use a border, not a shadow.</CardDescription>
          </CardHeader>
          <CardContent>Content inside a card.</CardContent>
        </Card>
      </Block>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto max-w-6xl space-y-2 px-4 py-10">
        <h1 className="text-4xl font-bold">Design system</h1>
        <p className="max-w-prose font-serif text-muted-foreground">
          Tokens live in <code className="font-mono">src/styles/tokens.css</code>. Anything outside
          them fails <code className="font-mono">npm run lint</code>. Both themes are shown side by
          side.
        </p>
      </header>
      <div className="grid lg:grid-cols-2">
        <section className="light bg-background p-8 text-foreground">
          <Specimen theme="light" />
        </section>
        <section className="dark bg-background p-8 text-foreground">
          <Specimen theme="dark" />
        </section>
      </div>
    </main>
  );
}
