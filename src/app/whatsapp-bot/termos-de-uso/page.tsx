import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { TableOfContents } from '@/components/legal/table-of-contents';

export const metadata: Metadata = {
  title: 'Termos de Uso - MendoHub',
  description:
    'Termos de Uso do MendoHub - Condições gerais de uso da plataforma de integração com WhatsApp Business API.',
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = '09 de janeiro de 2026';

const tocItems = [
  { id: 'aceitacao', title: '1. Aceitação dos Termos', level: 2 },
  { id: 'estado-projeto', title: '2. Estado do Projeto', level: 2 },
  { id: 'descricao', title: '3. Descrição do Serviço', level: 2 },
  { id: 'elegibilidade', title: '4. Elegibilidade e Requisitos', level: 2 },
  { id: 'uso-permitido', title: '5. Uso Permitido', level: 2 },
  { id: 'uso-proibido', title: '6. Uso Proibido', level: 2 },
  { id: 'responsabilidades', title: '7. Responsabilidades', level: 2 },
  { id: 'limitacao', title: '8. Limitação de Responsabilidade', level: 2 },
  { id: 'propriedade', title: '9. Propriedade Intelectual', level: 2 },
  { id: 'modificacoes', title: '10. Modificações nos Termos', level: 2 },
  { id: 'rescisao', title: '11. Rescisão', level: 2 },
  { id: 'lei-aplicavel', title: '12. Lei Aplicável', level: 2 },
  { id: 'contato', title: '13. Contato', level: 2 },
];

export default function TermosUsoPage() {
  return (
    <LegalLayout
      title="Termos de Uso"
      lastUpdated={lastUpdated}
      otherPageTitle="Política de Privacidade"
      otherPageHref="/whatsapp-bot/politica-de-privacidade"
      tableOfContents={<TableOfContents items={tocItems} />}
    >
      <section id="aceitacao" className="scroll-mt-20">
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Bem-vindo aos Termos de Uso do <strong>MendoHub</strong>, operado por{' '}
          <strong>Cleyton Mendes</strong>.
        </p>
        <p>
          Ao utilizar este serviço, você concorda com estes Termos de Uso e com
          nossa Política de Privacidade.
        </p>
        <p>
          Se você não concorda com estes termos, não utilize o serviço.
        </p>
      </section>

      <section id="estado-projeto" className="scroll-mt-20">
        <h2>2. Estado do Projeto</h2>
        <p>
          <strong>IMPORTANTE:</strong> O MendoHub está atualmente em{' '}
          <strong>fase de desenvolvimento e testes</strong>.
        </p>
        <p>Este projeto está sendo desenvolvido para:</p>
        <ul>
          <li>Testar a integração com a WhatsApp Business API da Meta</li>
          <li>Desenvolver funcionalidades básicas de mensageria</li>
          <li>Validar viabilidade técnica e conformidade</li>
          <li>Uso pessoal e experimental</li>
        </ul>
        <p>
          <strong>Não há garantias de:</strong>
        </p>
        <ul>
          <li>Disponibilidade contínua do serviço</li>
          <li>Suporte técnico estruturado</li>
          <li>Funcionalidades avançadas ou comerciais</li>
          <li>Escalabilidade para uso em produção</li>
        </ul>
        <p>
          Estes termos serão atualizados conforme o projeto evolui para
          refletir novas funcionalidades e capacidades.
        </p>
      </section>

      <section id="descricao" className="scroll-mt-20">
        <h2>3. Descrição do Serviço</h2>
        <p>
          O MendoHub é um projeto de integração básica com a WhatsApp Business
          API que atualmente oferece:
        </p>
        <ul>
          <li>Envio e recebimento de mensagens via WhatsApp Business API</li>
          <li>Armazenamento temporário de histórico de conversas</li>
          <li>Funcionalidades básicas para testes e desenvolvimento</li>
        </ul>
        <p>
          O serviço utiliza a API oficial do WhatsApp Business fornecida pela
          Meta Platforms, Inc. e está sujeito aos termos e limitações da Meta.
        </p>
      </section>

      <section id="elegibilidade" className="scroll-mt-20">
        <h2>4. Elegibilidade e Requisitos</h2>
        <p>Para utilizar o MendoHub, é necessário:</p>
        <ul>
          <li>Ser maior de 18 anos</li>
          <li>
            Possuir um número de telefone registrado na WhatsApp Business API
          </li>
          <li>
            Estar em conformidade com os Termos de Serviço da Meta/WhatsApp
          </li>
          <li>
            Fornecer informações verdadeiras e atualizadas quando solicitado
          </li>
        </ul>
      </section>

      <section id="uso-permitido" className="scroll-mt-20">
        <h2>5. Uso Permitido</h2>
        <p>
          O MendoHub pode ser utilizado para fins legítimos e em conformidade
          com a lei, incluindo:
        </p>
        <ul>
          <li>Testes de integração com WhatsApp Business API</li>
          <li>Desenvolvimento de funcionalidades de mensageria</li>
          <li>Comunicações pessoais ou comerciais legítimas</li>
          <li>Atendimento ao cliente básico</li>
        </ul>
        <p>
          Todo uso deve estar em conformidade com as Políticas da Meta/WhatsApp
          e a legislação brasileira.
        </p>
      </section>

      <section id="uso-proibido" className="scroll-mt-20">
        <h2>6. Uso Proibido</h2>
        <p>
          É <strong>estritamente proibido</strong> utilizar o MendoHub para:
        </p>
        <ul>
          <li>
            <strong>Spam:</strong> Envio massivo de mensagens não solicitadas
          </li>
          <li>
            <strong>Conteúdo ilegal:</strong> Compartilhamento de material que
            viole leis brasileiras
          </li>
          <li>
            <strong>Fraude:</strong> Práticas enganosas, phishing ou golpes
          </li>
          <li>
            <strong>Assédio:</strong> Perseguição, ameaças ou intimidação
          </li>
          <li>
            <strong>Violação de direitos:</strong> Infringir propriedade
            intelectual ou privacidade de terceiros
          </li>
          <li>
            <strong>Abuso do sistema:</strong> Tentativas de comprometer a
            segurança ou sobrecarregar a infraestrutura
          </li>
          <li>
            <strong>Violação das políticas da Meta:</strong> Qualquer atividade
            que contrarie os Termos de Serviço do WhatsApp Business
          </li>
        </ul>
        <p>
          Violações resultarão em suspensão imediata do acesso sem aviso prévio.
        </p>
      </section>

      <section id="responsabilidades" className="scroll-mt-20">
        <h2>7. Responsabilidades do Usuário</h2>
        <p>Ao utilizar o MendoHub, você é responsável por:</p>
        <ul>
          <li>
            Manter a confidencialidade de suas credenciais de acesso
          </li>
          <li>
            Garantir que possui autorização para enviar mensagens aos
            destinatários
          </li>
          <li>
            Cumprir as Políticas da Meta/WhatsApp e a legislação aplicável
          </li>
          <li>
            Todo conteúdo enviado através do serviço
          </li>
          <li>
            Notificar imediatamente sobre qualquer uso não autorizado de sua
            conta
          </li>
        </ul>
      </section>

      <section id="limitacao" className="scroll-mt-20">
        <h2>8. Limitação de Responsabilidade</h2>
        <p>
          O MendoHub é fornecido "no estado em que se encontra" (as is), sem
          garantias de qualquer tipo.
        </p>
        <p>
          <strong>Não nos responsabilizamos por:</strong>
        </p>
        <ul>
          <li>
            <strong>Disponibilidade:</strong> Interrupções, falhas ou
            indisponibilidade do serviço
          </li>
          <li>
            <strong>Limitações da API:</strong> Problemas, mudanças ou
            bloqueios na WhatsApp Business API da Meta
          </li>
          <li>
            <strong>Perda de dados:</strong> Perda, corrupção ou exclusão de
            mensagens ou dados
          </li>
          <li>
            <strong>Danos indiretos:</strong> Lucros cessantes, perda de
            oportunidades ou danos consequenciais
          </li>
          <li>
            <strong>Conteúdo de usuários:</strong> Mensagens ou conteúdo
            compartilhado através do serviço
          </li>
          <li>
            <strong>Bloqueios pela Meta:</strong> Se seu número de WhatsApp
            Business for bloqueado por violar políticas da Meta
          </li>
        </ul>
        <p>
          Por se tratar de um projeto experimental, o serviço pode ser
          descontinuado a qualquer momento sem aviso prévio.
        </p>
      </section>

      <section id="propriedade" className="scroll-mt-20">
        <h2>9. Propriedade Intelectual</h2>
        <p>
          O código, design e marca MendoHub são propriedade de Cleyton Mendes.
        </p>
        <p>
          Você mantém todos os direitos sobre o conteúdo que compartilha através
          do serviço (mensagens, mídias, etc.).
        </p>
        <p>
          É proibido copiar, modificar, distribuir ou criar obras derivadas do
          MendoHub sem autorização expressa.
        </p>
      </section>

      <section id="modificacoes" className="scroll-mt-20">
        <h2>10. Modificações nos Termos</h2>
        <p>
          Estes Termos de Uso podem ser atualizados a qualquer momento para
          refletir:
        </p>
        <ul>
          <li>Evolução do projeto e novas funcionalidades</li>
          <li>Mudanças na legislação</li>
          <li>Alterações nas políticas da Meta/WhatsApp</li>
        </ul>
        <p>
          Alterações significativas serão comunicadas através do email de
          contato ou por aviso nesta página. A data de "Última atualização" no
          topo será sempre atualizada.
        </p>
        <p>
          O uso continuado do serviço após alterações constitui aceitação dos
          novos termos.
        </p>
      </section>

      <section id="rescisao" className="scroll-mt-20">
        <h2>11. Rescisão</h2>
        <p>Podemos suspender ou encerrar seu acesso imediatamente se:</p>
        <ul>
          <li>Você violar estes Termos de Uso</li>
          <li>Detectarmos uso abusivo ou fraudulento</li>
          <li>Seu número for bloqueado pela Meta/WhatsApp</li>
          <li>
            Houver ordem judicial ou requisição de autoridade competente
          </li>
          <li>
            Decidirmos descontinuar o projeto (por ser experimental)
          </li>
        </ul>
        <p>
          Você pode parar de usar o serviço a qualquer momento. Dados serão
          tratados conforme nossa Política de Privacidade.
        </p>
      </section>

      <section id="lei-aplicavel" className="scroll-mt-20">
        <h2>12. Lei Aplicável e Jurisdição</h2>
        <p>
          Estes Termos de Uso são regidos pelas leis da República Federativa do
          Brasil, incluindo:
        </p>
        <ul>
          <li>Lei nº 13.709/2018 (LGPD)</li>
          <li>Lei nº 12.965/2014 (Marco Civil da Internet)</li>
          <li>Lei nº 8.078/1990 (Código de Defesa do Consumidor)</li>
        </ul>
        <p>
          Quaisquer disputas serão resolvidas no foro da comarca do Rio de
          Janeiro, RJ.
        </p>
      </section>

      <section id="contato" className="scroll-mt-20">
        <h2>13. Contato e Suporte</h2>
        <p>
          Para dúvidas sobre estes Termos de Uso ou questões técnicas, entre em
          contato:
        </p>
        <div className="not-prose bg-muted p-4 rounded-lg my-4">
          <p className="mb-2">
            <strong>MendoHub - Cleyton Mendes</strong>
          </p>
          <p className="mb-2">
            <strong>Email:</strong>{' '}
            <a
              href="mailto:contato@cleyton-mendes.com"
              className="text-primary hover:underline"
            >
              contato@cleyton-mendes.com
            </a>
          </p>
          <p>
            <strong>Localização:</strong> Rio de Janeiro, RJ - Brasil
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <strong>Nota:</strong> Por se tratar de um projeto experimental, o
          tempo de resposta pode variar. Faremos o melhor esforço para
          responder em até 7 dias úteis.
        </p>
        <p className="text-sm text-muted-foreground mt-6">
          <strong>Última atualização:</strong> {lastUpdated}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Ao utilizar o MendoHub, você declara ter lido, compreendido e aceito
          estes Termos de Uso e nossa Política de Privacidade.
        </p>
      </section>
    </LegalLayout>
  );
}
