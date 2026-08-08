# Relatório Parcial — Projeto de Extensão Curricularizada

## 1. Identificação do Projeto
* **Nome do Projeto:** Dashboard de Consolidação e Análise de Audiência Digital
* **Integrantes:** [Nome dos Integrantes / Dupla]
* **Curso:** Análise e Desenvolvimento de Sistemas (ADS)
* **Instituição de Ensino:** [Nome da Faculdade / Universidade]
* **Instituição Parceira:** Igreja Cristã Maranata (Canal Oficial do YouTube: [@IgrejaCristaMaranataOficial](https://www.youtube.com/@IgrejaCristaMaranataOficial))
* **Backend de Banco de Dados:** Supabase Cloud (PostgreSQL BaaS)
* **Temática Escolhida:** Temática 2 — Dados, Inteligência e Tomada de Decisão Social

---

## 2. Introdução
A Igreja Cristã Maranata é uma instituição religiosa e comunitária que atua fortemente no meio presencial e digital. Com a expansão do canal oficial no YouTube, a instituição realiza transmissões digitais diárias e semanais (Escola Bíblica Dominical, Madrugadas de Oração, Cultos de Doutrina, Convenções Internacionais nos Maanains, Cantatas de Louvor e Transmissões Multilíngues), alcançando espectadores em todo o território nacional e em dezenas de países.

Neste cenário de transformação digital, os dados gerados pelas transmissões no YouTube representam um ativo valioso de inteligência de comunicação. No entanto, o volume de métricas geradas exige uma abordagem estruturada para transformar dados brutos de visualização em conhecimento acionável. 

O presente projeto de extensão propõe o desenvolvimento de um **Dashboard Web de Análise de Audiência Digital**, integrando técnicas de coleta, tratamento, visualização e banco de dados via **Supabase (PostgreSQL Cloud)** para subsidiar a tomada de decisão da equipe de comunicação da instituição.

---

## 3. Justificativa
A realização de transmissões ao vivo e a publicação de conteúdos digitais pela Igreja Cristã Maranata permitem ultrapassar limites geográficos e conectar membros e simpatizantes no Brasil e no exterior. Contudo, a análise pontual das métricas fornecidas pelas plataformas de streaming limita o aproveitamento estratégico dessas informações.

O projeto se justifica pela necessidade urgente de:
1. **Centralizar e Organizar os Dados em Banco Cloud (Supabase):** Eliminar o isolamento das informações de audiência espalhadas por vídeos pontuais através de um banco PostgreSQL relacional.
2. **Subsidiar a Tomada de Decisão Social:** Permitir à liderança e equipe de mídias identificar quais conteúdos possuem maior engajamento, quais horários garantem melhor audiência e quais regiões necessitam de suporte de comunicação direcionado.
3. **Maximizar o Alcance Comunitário:** Otimizar o investimento em equipamentos, transmissões e infraestrutura digital a partir de evidências de desempenho real.

---

## 4. ODS Relacionados ao Projeto

O projeto conecta-se diretamente aos Objetivos de Desenvolvimento Sustentável (ODS) da Agenda 2030 das Nações Unidas:

### **ODS 9 — Indústria, Inovação e Infraestrutura**
* **Meta 9.c:** Aumentar significativamente o acesso às tecnologias de informação e comunicação.
* **Relação com a solução:** O desenvolvimento de uma solução web inovadora com backend Supabase para visualização e inteligência de dados democratiza o acesso às métricas de comunicação digital da instituição.

### **ODS 16 — Paz, Justiça e Instituições Eficazes**
* **Meta 16.6:** Desenvolver instituições eficazes, responsáveis e transparentes em todos os níveis.
* **Relação com a solução:** Ao aplicar data analytics na gestão dos eventos digitais, o projeto fortalece a eficácia institucional da Igreja Cristã Maranata, viabilizando o uso consciente de recursos e melhor planejamento de ações de utilidade pública e social.

---

## 5. Caracterização da Instituição Parceira
* **Instituição:** Igreja Cristã Maranata
* **Cores Institucionais:** Vermelho (`#DC2626`) e Branco (`#FFFFFF`)
* **Área/Setor Envolvido:** Departamento de Comunicação, Mídia e Transmissões Digitais
* **Canal Oficial:** YouTube ([@IgrejaCristaMaranataOficial](https://www.youtube.com/@IgrejaCristaMaranataOficial))
* **Público Beneficiado:** Equipe técnica, voluntários de mídias, lideranças e milhares de membros/espectadores no Brasil e exterior.

---

## 6. Diagnóstico Inicial
A partir do levantamento preliminar junto ao canal oficial da Igreja Cristã Maranata no YouTube, constatou-se que:
1. A igreja possui um volume expressivo de transmissões diárias (Escola Bíblica Dominical às 10h, Madrugadas de Oração às 05h, Cultos noturnos, Cantatas e Convenções).
2. Cada transmissão gera relatórios de visualizações totais, pico de espectadores simultâneos, tempo médio de exibição e alcance geográfico por países e cidades.
3. Existe demanda real por relatórios analíticos que respondam de forma rápida: *Qual foi o evento de maior alcance do trimestre?*, *Como está o crescimento da audiência internacional em países de língua portuguesa?* e *Quais horários retêm mais audiência ao vivo?*.

---

## 7. Problema Identificado
A Igreja Cristã Maranata realiza transmissões digitais pelo YouTube com alto alcance geográfico. Entretanto, os dados de audiência encontram-se desorganizados e fragmentados por vídeo. Essa ausência de visão centralizada e persistida em banco de dados relacional impede a comparação sistemática de eventos e o planejamento fundamentado de mídias.

---

## 8. Objetivo Geral
Desenvolver um **Dashboard Web de Análise de Audiência Digital integrado ao Supabase (PostgreSQL)** para consolidar, comparar e visualizar dados de transmissões e eventos da Igreja Cristã Maranata no YouTube.

---

## 9. Objetivos Específicos
1. Mapear os principais indicadores de audiência do YouTube Analytics aplicáveis ao contexto da instituição.
2. Estruturar o modelo físico relacional no Supabase (tabelas `transmissoes`, `categorias`, `audiencia_paises`).
3. Desenvolver uma interface web intuitiva nas cores institucionais (Vermelho e Branco).
4. Implementar visualizações gráficas de evolução temporal da audiência e alcance por país.
5. Criar um módulo de comparação direta de desempenho entre eventos (comparação lado a lado).
6. Disponibilizar filtros dinâmicos por período, categoria de evento e busca textual.
7. Validar o protótipo funcional (MVP) com cenários de testes e dados de transmissões.

---

## 10. Proposta Inicial da Solução
A solução proposta consiste em uma **Plataforma Web (Dashboard Analytical App)** integrada ao **Supabase**. O sistema organiza a visualização em módulos fundamentais:

```
[ Dashboard Geral (Vermelho & Branco) ]
        ├── Cards de KPIs (Views, Tempo de Exibição, Espectadores Simultâneos)
        ├── Gráfico de Evolução Temporal (Views & Retenção)
        └── Acervo Completo de Transmissões

[ Banco de Dados Supabase (SQL Panel) ]
        ├── Conexão Cloud & Credenciais (.env)
        ├── Script SQL DDL (supabase_schema.sql)
        └── Dicionário de Dados das Tabelas PostgreSQL

[ Análise Geográfica por País (RF04) ]
        └── Alcance Internacional (Brasil, EUA, Portugal, Angola, etc.)

[ Comparador de Eventos (RF06) ]
        └── Confronto Direto de 2 a 3 Transmissões
```

---

## 11. Requisitos Iniciais

### Requisitos Funcionais (RF)
| Código | Descrição | Prioridade |
| :--- | :--- | :--- |
| **RF01** | O sistema deverá apresentar a quantidade total de visualizações consolidadas e por evento. | Alta |
| **RF02** | O sistema deverá permitir a filtragem dos dados por períodos e categorias (EBD, Oração, Convenção, Louvor). | Alta |
| **RF03** | O sistema deverá permitir a visualização detalhada de dados individuais de cada evento/vídeo. | Alta |
| **RF04** | O sistema deverá apresentar a distribuição geográfica da audiência por país em gráficos e tabelas. | Alta |
| **RF05** | O sistema deverá apresentar gráficos interativos de evolução temporal da audiência e retenção. | Alta |
| **RF06** | O sistema deverá permitir selecionar e comparar simultaneamente o desempenho de múltiplos eventos. | Alta |
| **RF07** | O sistema deverá permitir a busca por nome de evento/transmissão e exportação para CSV. | Média |
| **RF08** | O sistema deverá integrar-se ao Supabase (PostgreSQL BaaS) para persistência e consulta SQL. | Alta |

---

## 12. Planejamento do MVP e Modelo de Banco de Dados Supabase
O script de banco de dados `supabase_schema.sql` disponibilizado no projeto define a seguinte DDL:

```sql
CREATE TABLE IF NOT EXISTS public.transmissoes (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria_nome VARCHAR(100),
    data_transmissao DATE NOT NULL,
    visualizacoes INT DEFAULT 0 NOT NULL,
    pico_simultaneo INT DEFAULT 0,
    tempo_medio_minutos INT DEFAULT 0,
    horas_exibidas INT DEFAULT 0,
    taxa_retencao INT DEFAULT 0,
    thumbnail_url TEXT
);
```

---

## 13. Considerações Parciais
O protótipo funcional MVP foi implementado nas cores **Vermelho e Branco**, trazendo o acervo de conteúdos reais da Igreja Cristã Maranata e a infraestrutura pronta para conexão ao **Supabase**. As próximas etapas compreendem a validação final junto à liderança de comunicação da igreja.
