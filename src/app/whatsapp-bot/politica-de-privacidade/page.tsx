import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { TableOfContents } from '@/components/legal/table-of-contents';

export const metadata: Metadata = {
  title: 'Política de Privacidade - MendoHub',
  description:
    'Política de privacidade do MendoHub - Como coletamos, usamos e protegemos seus dados.',
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = '09 de janeiro de 2026';

const tocItems = [
  { id: 'introducao', title: '1. Introdução', level: 2 },
  { id: 'estado-projeto', title: '2. Estado do Projeto', level: 2 },
  { id: 'dados-coletados', title: '3. Dados Coletados', level: 2 },
  { id: 'finalidade', title: '4. Finalidade da Coleta', level: 2 },
  { id: 'base-legal', title: '5. Base Legal (LGPD)', level: 2 },
  { id: 'compartilhamento', title: '6. Compartilhamento de Dados', level: 2 },
  { id: 'retencao', title: '7. Retenção de Dados', level: 2 },
  { id: 'direitos', title: '8. Direitos do Usuário', level: 2 },
  { id: 'seguranca', title: '9. Segurança', level: 2 },
  { id: 'alteracoes', title: '10. Alterações na Política', level: 2 },
  { id: 'contato', title: '11. Contato', level: 2 },
  { id: 'jurisdicao', title: '12. Lei Aplicável e Jurisdição', level: 2 },
];

export default function PoliticaPrivacidadePage() {
  return (
    <LegalLayout
      title="Política de Privacidade"
      lastUpdated={lastUpdated}
      otherPageTitle="Termos de Uso"
      otherPageHref="/whatsapp-bot/termos-de-uso"
      tableOfContents={<TableOfContents items={tocItems} />}
    >
      <section id="introducao" className="scroll-mt-20">
        <h2>1. Introdução</h2>
        <p>
          Bem-vindo à Política de Privacidade do <strong>MendoHub</strong>,
          operado por <strong>Cleyton Mendes</strong>.
        </p>
        <p>
          O MendoHub é um projeto em desenvolvimento para integração com a API
          oficial do WhatsApp Business fornecida pela Meta Platforms, Inc.
        </p>
        <p>
          Esta política descreve como coletamos, usamos e protegemos dados
          pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD -
          Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).
        </p>
      </section>

      <section id="estado-projeto" className="scroll-mt-20">
        <h2>2. Estado do Projeto</h2>
        <p>
          <strong>IMPORTANTE:</strong> O MendoHub está atualmente em{' '}
          <strong>fase de desenvolvimento e testes</strong>.
        </p>
        <p>
          O serviço está sendo desenvolvido para uso pessoal e experimental com
          a WhatsApp Business API. As funcionalidades descritas nesta política
          representam o escopo básico necessário para:
        </p>
        <ul>
          <li>Testar a integração com a API do WhatsApp Business</li>
          <li>Desenvolver funcionalidades básicas de envio e recebimento de mensagens</li>
          <li>Validar conformidade com as políticas da Meta</li>
        </ul>
        <p>
          À medida que o projeto evolui, esta política será atualizada para
          refletir novas funcionalidades e práticas. Você será notificado sobre
          qualquer alteração significativa.
        </p>
      </section>

      <section id="dados-coletados" className="scroll-mt-20">
        <h2>3. Dados Coletados</h2>
        <p>
          Durante o uso do MendoHub através da WhatsApp Business API, coletamos
          apenas os dados mínimos necessários para o funcionamento básico:
        </p>
        <ul>
          <li>
            <strong>Número de telefone:</strong> Fornecido automaticamente pela
            API do WhatsApp quando uma mensagem é enviada ou recebida
          </li>
          <li>
            <strong>Conteúdo das mensagens:</strong> Texto, mídia ou outros
            conteúdos enviados via WhatsApp
          </li>
          <li>
            <strong>Metadados básicos:</strong> Data, hora e status das
            mensagens (enviada, entregue, lida)
          </li>
        </ul>
        <p>
          <strong>Dados que NÃO coletamos:</strong>
        </p>
        <ul>
          <li>Localização geográfica</li>
          <li>Lista de contatos</li>
          <li>Dados sensíveis (saúde, religião, orientação sexual, etc.)</li>
          <li>Informações financeiras ou de pagamento</li>
        </ul>
      </section>

      <section id="finalidade" className="scroll-mt-20">
        <h2>4. Finalidade da Coleta</h2>
        <p>Os dados coletados são utilizados exclusivamente para:</p>
        <ul>
          <li>
            <strong>Desenvolvimento e testes:</strong> Validar a integração com
            a WhatsApp Business API
          </li>
          <li>
            <strong>Envio e recebimento de mensagens:</strong> Processar
            comunicações via WhatsApp conforme solicitado
          </li>
          <li>
            <strong>Troubleshooting:</strong> Identificar e corrigir problemas
            técnicos
          </li>
          <li>
            <strong>Conformidade:</strong> Atender requisitos legais e políticas
            da Meta/WhatsApp
          </li>
        </ul>
      </section>

      <section id="base-legal" className="scroll-mt-20">
        <h2>5. Base Legal (LGPD)</h2>
        <p>
          O tratamento de dados pessoais no MendoHub está fundamentado nas
          seguintes bases legais previstas no Art. 7º da LGPD:
        </p>
        <ul>
          <li>
            <strong>Consentimento (Art. 7º, I):</strong> Ao iniciar uma conversa
            via WhatsApp, você consente com o processamento de suas mensagens
          </li>
          <li>
            <strong>Legítimo interesse (Art. 7º, IX):</strong> Para desenvolvimento,
            testes e melhoria do sistema
          </li>
          <li>
            <strong>Cumprimento de obrigação legal (Art. 7º, II):</strong> Quando
            exigido por lei ou pela Meta/WhatsApp
          </li>
        </ul>
      </section>

      <section id="compartilhamento" className="scroll-mt-20">
        <h2>6. Compartilhamento de Dados</h2>
        <p>
          Seus dados são compartilhados apenas com as seguintes partes
          necessárias:
        </p>
        <ul>
          <li>
            <strong>Meta Platforms (WhatsApp):</strong> Todos os dados
            trafegam através da API oficial do WhatsApp Business conforme os
            Termos de Serviço da Meta
          </li>
          <li>
            <strong>Infraestrutura básica:</strong> Serviços de hosting
            necessários para armazenar temporariamente dados de teste
          </li>
        </ul>
        <p>
          <strong>NÃO compartilhamos seus dados com:</strong>
        </p>
        <ul>
          <li>Anunciantes ou empresas de marketing</li>
          <li>Terceiros para fins comerciais</li>
          <li>Qualquer outra entidade não essencial para o funcionamento do serviço</li>
        </ul>
      </section>

      <section id="retencao" className="scroll-mt-20">
        <h2>7. Retenção de Dados</h2>
        <p>
          Dados são retidos apenas pelo tempo necessário para fins de
          desenvolvimento e teste:
        </p>
        <ul>
          <li>
            <strong>Mensagens e histórico:</strong> Até 30 dias ou quando você
            solicitar exclusão
          </li>
          <li>
            <strong>Logs técnicos:</strong> Até 7 dias para troubleshooting
          </li>
        </ul>
        <p>
          Você pode solicitar a exclusão completa de seus dados a qualquer
          momento através do email de contato.
        </p>
      </section>

      <section id="direitos" className="scroll-mt-20">
        <h2>8. Direitos do Usuário (Art. 18 da LGPD)</h2>
        <p>
          Você tem os seguintes direitos em relação aos seus dados pessoais:
        </p>
        <ul>
          <li>
            <strong>Acesso:</strong> Confirmar se tratamos seus dados e obter
            cópias
          </li>
          <li>
            <strong>Correção:</strong> Solicitar correção de dados incorretos
          </li>
          <li>
            <strong>Exclusão:</strong> Solicitar a eliminação completa de seus
            dados
          </li>
          <li>
            <strong>Portabilidade:</strong> Receber seus dados em formato
            estruturado
          </li>
          <li>
            <strong>Revogação do consentimento:</strong> Retirar seu
            consentimento a qualquer momento
          </li>
        </ul>
        <p>
          Para exercer qualquer destes direitos, entre em contato através do
          email:{' '}
          <a href="mailto:contato@cleyton-mendes.com">
            contato@cleyton-mendes.com
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          Responderemos em até 15 dias corridos conforme estabelecido pela LGPD.
        </p>
      </section>

      <section id="seguranca" className="scroll-mt-20">
        <h2>9. Segurança</h2>
        <p>
          Implementamos medidas de segurança técnicas e organizacionais para
          proteger seus dados:
        </p>
        <ul>
          <li>
            <strong>Criptografia:</strong> Dados em trânsito protegidos com
            TLS/SSL
          </li>
          <li>
            <strong>Acesso restrito:</strong> Apenas o desenvolvedor tem acesso
            aos dados durante o período de desenvolvimento
          </li>
          <li>
            <strong>Armazenamento seguro:</strong> Dados armazenados em
            infraestrutura com padrões de segurança adequados
          </li>
        </ul>
        <p>
          Em caso de incidente de segurança que possa comprometer seus dados,
          você será notificado conforme exigido pela LGPD.
        </p>
      </section>

      <section id="alteracoes" className="scroll-mt-20">
        <h2>10. Alterações na Política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada para refletir:
        </p>
        <ul>
          <li>Evolução do projeto e novas funcionalidades</li>
          <li>Mudanças na legislação</li>
          <li>Alterações nas políticas da Meta/WhatsApp</li>
        </ul>
        <p>
          Alterações significativas serão comunicadas através do email de
          contato cadastrado ou por aviso nesta página. A data de "Última
          atualização" no topo da página será sempre atualizada.
        </p>
      </section>

      <section id="contato" className="scroll-mt-20">
        <h2>11. Contato</h2>
        <p>
          Para dúvidas, solicitações ou exercício de seus direitos relacionados
          a dados pessoais:
        </p>
        <div className="not-prose bg-muted p-4 rounded-lg my-4">
          <p className="mb-2">
            <strong>Responsável:</strong> Cleyton Mendes
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
      </section>

      <section id="jurisdicao" className="scroll-mt-20">
        <h2>12. Lei Aplicável e Jurisdição</h2>
        <p>
          Esta Política de Privacidade é regida pelas leis da República
          Federativa do Brasil, em especial pela Lei nº 13.709/2018 (LGPD) e
          pela Lei nº 12.965/2014 (Marco Civil da Internet).
        </p>
        <p>
          Quaisquer disputas serão submetidas ao foro da comarca do Rio de
          Janeiro, RJ.
        </p>
        <p className="text-sm text-muted-foreground mt-6">
          <strong>Última atualização:</strong> {lastUpdated}
        </p>
      </section>
    </LegalLayout>
  );
}
