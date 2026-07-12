// ===== FAQ PAGE SPECIFIC JAVASCRIPT =====
(function() {
  'use strict';

  // ===== FAQ DATA =====
  const faqData = [
    // FUNDAMENTALS
    {
      id: 'ai-ml-dl',
      category: 'fundamentals',
      question: "What's the difference between AI, Machine Learning, and Deep Learning?",
      answer: `
        <p>Think of them as nested concepts — like Russian dolls:</p>
        <ul>
          <li><strong>Artificial Intelligence (AI)</strong> — The broadest umbrella: any technique that enables computers to mimic human intelligence (reasoning, perception, learning, problem-solving).</li>
          <li><strong>Machine Learning (ML)</strong> — A <em>subset</em> of AI where systems learn patterns from data without being explicitly programmed for every rule. Instead of hard-coded <code>if/else</code>, the model infers relationships from examples.</li>
          <li><strong>Deep Learning (DL)</strong> — A <em>subset of ML</em> using artificial neural networks with many layers ("deep") to learn hierarchical representations. Excels at unstructured data: images, audio, text.</li>
        </ul>
        <p><strong>Analogy:</strong> AI is "vehicles." ML is "motor vehicles." DL is "electric vehicles" — a specific, powerful type of motor vehicle.</p>
        <h4>Quick Comparison</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Aspect</th><th style="text-align:left; padding:0.5rem;">Traditional ML</th><th style="text-align:left; padding:0.5rem;">Deep Learning</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Feature Engineering</td><td style="padding:0.5rem;">Manual, domain expertise needed</td><td style="padding:0.5rem;">Automatic, learned from raw data</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Data Size</td><td style="padding:0.5rem;">Works with smaller datasets</td><td style="padding:0.5rem;">Needs large datasets</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Interpretability</td><td style="padding:0.5rem;">Higher (feature importance, trees)</td><td style="padding:0.5rem;">Lower (black box)</td></tr>
            <tr><td style="padding:0.5rem;">Training Time</td><td style="padding:0.5rem;">Seconds to minutes</td><td style="padding:0.5rem;">Minutes to weeks (GPUs)</td></tr>
          </tbody>
        </table>
        <p><strong>When to use which?</strong> Start with traditional ML (XGBoost, Random Forest) for tabular data. Use DL for images, audio, text, or when you have massive data and compute.</p>
      `,
      tags: ['Beginner', 'Core Concept']
    },
    {
      id: 'supervised-unsupervised',
      category: 'fundamentals',
      question: "What's the difference between supervised, unsupervised, and reinforcement learning?",
      answer: `
        <p>These are the three main <strong>learning paradigms</strong> — how the model gets feedback during training.</p>
        <h4>1. Supervised Learning</h4>
        <p><strong>Setup:</strong> Input <code>X</code> → Model → Prediction <code>ŷ</code>, compared to ground truth <code>y</code>.</p>
        <p><strong>Feedback:</strong> Exact correct answer (label) for every training example.</p>
        <p><strong>Tasks:</strong> Classification (spam/not spam), Regression (house price), Object detection.</p>
        <p><strong>Examples:</strong> Linear regression, Random Forest, BERT fine-tuning.</p>

        <h4>2. Unsupervised Learning</h4>
        <p><strong>Setup:</strong> Input <code>X</code> only — no labels.</p>
        <p><strong>Feedback:</strong> Internal structure of the data (clusters, patterns, density).</p>
        <p><strong>Tasks:</strong> Clustering (customer segments), Dimensionality reduction (PCA, t-SNE), Anomaly detection, Generative modeling (VAEs, GANs).</p>
        <p><strong>Examples:</strong> K-Means, DBSCAN, Autoencoders.</p>

        <h4>3. Reinforcement Learning (RL)</h4>
        <p><strong>Setup:</strong> Agent interacts with an environment over time. At each step: observes state <code>s</code>, takes action <code>a</code>, receives reward <code>r</code>, transitions to new state <code>s'</code>.</p>
        <p><strong>Feedback:</strong> Scalar reward signal — sparse, delayed, no "correct action" given.</p>
        <p><strong>Goal:</strong> Learn a policy <code>π(a|s)</code> maximizing cumulative reward.</p>
        <p><strong>Tasks:</strong> Game playing (AlphaGo), Robotics, Trading, Recommendation systems.</p>
        <p><strong>Examples:</strong> Q-Learning, PPO, SAC, MuZero.</p>

        <h4>Bonus: Self-Supervised Learning</h4>
        <p>A hybrid powering modern LLMs. Creates "supervision" from the data itself — e.g., "predict the next token" or "masked token prediction." No human labels needed, but uses supervised loss functions.</p>
      `,
      tags: ['Beginner', 'Core Concept']
    },
    {
      id: 'neural-network-basics',
      category: 'fundamentals',
      question: "How does a neural network actually work?",
      answer: `
        <p>A neural network is a <strong>function approximator</strong> composed of layers of simple computing units (neurons) that transform input into output through learned weights.</p>

        <h4>The Neuron (Perceptron)</h4>
        <p>Each neuron does: <code>output = activation(Σ(wᵢ × xᵢ) + b)</code></p>
        <ul>
          <li><code>xᵢ</code> = inputs</li>
          <li><code>wᵢ</code> = learned weights (importance of each input)</li>
          <li><code>b</code> = bias (shift)</li>
          <li><code>activation</code> = non-linear function (ReLU, GELU, Sigmoid, Tanh)</li>
        </ul>
        <p>Without non-linear activations, a deep network collapses to a single linear layer.</p>

        <h4>Architecture</h4>
        <ul>
          <li><strong>Input Layer</strong> — Receives raw features (pixels, tokens, numbers)</li>
          <li><strong>Hidden Layers</strong> — Learn progressively abstract representations</li>
          <li><strong>Output Layer</strong> — Produces predictions (class probabilities, values, tokens)</li>
        </ul>

        <h4>Training: Backpropagation + Gradient Descent</h4>
        <ol>
          <li><strong>Forward Pass:</strong> Input flows through, producing output</li>
          <li><strong>Loss:</strong> Compare output to target (CrossEntropy, MSE, etc.)</li>
          <li><strong>Backward Pass:</strong> Compute gradients <code>∂L/∂w</code> via chain rule</li>
          <li><strong>Update:</strong> <code>w ← w - η × ∂L/∂w</code> (η = learning rate)</li>
        </ol>
        <p>Modern optimizers (Adam, AdamW) adapt learning rates per-parameter.</p>

        <h4>Key Insight</h4>
        <p>Deep networks learn <strong>hierarchical features</strong>: edges → textures → parts → objects (vision) or characters → words → concepts → reasoning (text).</p>
      `,
      tags: ['Beginner', 'Core Concept']
    },
    {
      id: 'transformers-explained',
      category: 'fundamentals',
      question: "What is a Transformer and why does it matter?",
      answer: `
        <p>The <strong>Transformer</strong> (Vaswani et al., 2017) is the architecture behind <em>all</em> modern LLMs (GPT, BERT, Llama, Claude, Gemini, etc.). It replaced RNNs/LSTMs by enabling full parallelization and capturing long-range dependencies.</p>

        <h4>Core Innovation: Self-Attention</h4>
        <p>Instead of processing sequentially, every token attends to every other token simultaneously.</p>
        <pre><code>Attention(Q, K, V) = softmax(QKᵀ/√dₖ)V</code></pre>
        <ul>
          <li><strong>Q (Query)</strong> — What I'm looking for</li>
          <li><strong>K (Key)</strong> — What I contain</li>
          <li><strong>V (Value)</strong> — What I'll pass on if selected</li>
        </ul>
        <p>The dot-product <code>QKᵀ</code> measures compatibility. Softmax normalizes to probabilities. Weighted sum of Values = context-aware representation.</p>

        <h4>Multi-Head Attention</h4>
        <p>Run attention in parallel <code>h</code> times with different learned projections, then concatenate. Each head specializes (syntax, semantics, coreference, etc.).</p>

        <h4>Transformer Block</h4>
        <pre><code>Input
  ↓
LayerNorm → Multi-Head Attention → Residual Add
  ↓
LayerNorm → Feed-Forward (MLP) → Residual Add
  ↓
Output</code></pre>
        <p>Pre-LN (LayerNorm before sub-layer) is now standard for training stability.</p>

        <h4>Encoder vs Decoder</h4>
        <ul>
          <li><strong>Encoder-only (BERT)</strong> — Bidirectional. Great for understanding: classification, NER, embeddings.</li>
          <li><strong>Decoder-only (GPT)</strong> — Causal/autoregressive. Masks future tokens. Generates text.</li>
          <li><strong>Encoder-Decoder (T5, BART)</strong> — Sequence-to-sequence. Translation, summarization.</li>
        </ul>

        <h4>Why It Won</h4>
        <ol>
          <li><strong>Parallelizable</strong> — No sequential dependency like RNNs</li>
          <li><strong>Global context</strong> — Every token sees every other (within context window)</li>
          <li><strong>Scalable</strong> — Cleanly scales to billions of parameters</li>
          <li><strong>Transfer learning</strong> — Pre-train on massive corpus, fine-tune on tasks</li>
        </ol>
      `,
      tags: ['Intermediate', 'Core Concept']
    },
    {
      id: 'embeddings-explained',
      category: 'fundamentals',
      question: "What are embeddings and how do they work?",
      answer: `
        <p><strong>Embeddings</strong> are dense vector representations of discrete data (words, sentences, images, users, products) where <strong>semantic similarity = geometric proximity</strong>.</p>

        <h4>Key Properties</h4>
        <ul>
          <li><strong>Dense</strong> — Hundreds to thousands of dimensions (vs. one-hot: vocabulary size)</li>
          <li><strong>Meaningful distances</strong> — <code>cosine_sim(embedding("king") - embedding("man") + embedding("woman"), embedding("queen")) ≈ 1</code></li>
          <li><strong>Transferable</strong> — Pre-trained embeddings capture general knowledge</li>
        </ul>

        <h4>Types</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Type</th><th style="text-align:left; padding:0.5rem;">Input</th><th style="text-align:left; padding:0.5rem;">Use Case</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Word (Word2Vec, GloVe)</td><td style="padding:0.5rem;">Single token</td><td style="padding:0.5rem;">Static, context-independent</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Contextual (BERT, GPT)</td><td style="padding:0.5rem;">Token in context</td><td style="padding:0.5rem;">"Bank" river vs. "bank" money</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Sentence (SBERT, E5)</td><td style="padding:0.5rem;">Full text</td><td style="padding:0.5rem;">Semantic search, clustering</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Multimodal (CLIP, ImageBind)</td><td style="padding:0.5rem;">Text + Image</td><td style="padding:0.5rem;">Cross-modal retrieval</td></tr>
            <tr><td style="padding:0.5rem;">Graph/Entity</td><td style="padding:0.5rem;">Nodes in graph</td><td style="padding:0.5rem;">Recommendations, KGs</td></tr>
          </tbody>
        </table>

        <h4>How They're Created</h4>
        <ol>
          <li><strong>Co-occurrence</strong> — Words appearing in similar contexts get similar vectors (Word2Vec, GloVe)</li>
          <li><strong>Masked Language Modeling</strong> — Predict masked tokens from context (BERT)</li>
          <li><strong>Contrastive Learning</strong> — Pull positive pairs together, push negatives apart (CLIP, SBERT, E5)</li>
          <li><strong>Next-Token Prediction</strong> — Autoregressive training (GPT, Llama)</li>
        </ol>

        <h4>Practical: Using Embeddings</h4>
        <pre><code># Semantic search with sentence-transformers
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')
docs = ["AI transforms healthcare", "Machine learning in finance", "Deep learning for vision"]
query = "medical AI applications"

doc_emb = model.encode(docs)
query_emb = model.encode([query])
scores = np.dot(doc_emb, query_emb.T).flatten()
# Rank by score...</code></pre>
        <p><strong>Vector Databases</strong> (Pinecone, Weaviate, Qdrant, Milvus, Chroma) enable million-scale similarity search with HNSW/IVF indexes.</p>
      `,
      tags: ['Intermediate', 'Core Concept']
    },
    {
      id: 'fine-tuning-vs-rag',
      category: 'fundamentals',
      question: "When should I use fine-tuning vs. RAG vs. prompt engineering?",
      answer: `
        <p>These are <strong>complementary</strong> techniques at different levels of the stack:</p>

        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Technique</th><th style="text-align:left; padding:0.5rem;">What It Changes</th><th style="text-align:left; padding:0.5rem;">Best For</th><th style="text-align:left; padding:0.5rem;">Cost/Effort</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Prompt Engineering</strong></td><td style="padding:0.5rem;">Input context only</td><td style="padding:0.5rem;">Task instructions, few-shot examples, style, format</td><td style="padding:0.5rem;">$ (Free, instant)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>RAG</strong></td><td style="padding:0.5rem;">Retrieved knowledge injected at inference</td><td style="padding:0.5rem;">Factual QA, domain docs, up-to-date info, citations</td><td style="padding:0.5rem;">$$ (Setup + retrieval latency)</td></tr>
            <tr><td style="padding:0.5rem;"><strong>Fine-Tuning</strong></td><td style="padding:0.5rem;">Model weights updated</td><td style="padding:0.5rem;">Style/tone, specialized domains, new skills, compression</td><td style="padding:0.5rem;">$$$ (GPU hours, expertise)</td></tr>
          </tbody>
        </table>

        <h4>Decision Framework</h4>
        <ol>
          <li><strong>Start with prompting.</strong> Can the base model do it with good instructions + few-shot?</li>
          <li><strong>Add RAG</strong> if: needs external knowledge, must cite sources, data changes frequently, hallucinations on facts.</li>
          <li><strong>Fine-tune</strong> if: need consistent style/format, specialized domain (legal, medical code), want smaller/faster model, prompt/RAG not enough.</li>
        </ol>

        <h4>They Stack!</h4>
        <p>Best practice: <strong>Fine-tuned model + RAG + good prompts</strong></p>
        <ul>
          <li>Fine-tune for <em>behavior</em> (format, tone, reasoning style)</li>
          <li>RAG for <em>knowledge</em> (facts, documents, APIs)</li>
          <li>Prompts for <em>task instructions</em> (what to do right now)</li>
        </ul>

        <h4>Parameter-Efficient Fine-Tuning (PEFT)</h4>
        <p>LoRA (Low-Rank Adaptation) freezes base weights, trains tiny adapter matrices (<1% params). Enables fine-tuning 7B–70B models on consumer GPUs. QLoRA adds 4-bit quantization for even lower VRAM.</p>
      `,
      tags: ['Intermediate', 'Practical']
    },

    // GENERATIVE AI
    {
      id: 'llm-work',
      category: 'generative',
      question: "How do Large Language Models actually work?",
      answer: `
        <p>LLMs are <strong>probabilistic next-token predictors</strong> trained on massive text corpora. Here's the pipeline:</p>

        <h4>1. Tokenization</h4>
        <p>Text → integers via subword vocabulary (BPE, Unigram, WordPiece). GPT-4: ~100k tokens. Llama 3: 128k. "Token ≠ word" — ~0.75 words/token in English.</p>
        <pre><code>"Hello world" → [15496, 995]  # 2 tokens
"transformer" → [1234, 5678]        # 2 tokens (subwords)</code></pre>

        <h4>2. Embedding + Positional Encoding</h4>
        <p>Each token ID → learned vector (dimension <code>d_model</code>, e.g., 4096). Position info added (RoPE, ALiBi, learned) so order matters.</p>

        <h4>3. Transformer Layers (× N, e.g., 80–100+)</h4>
        <p>Each layer: Self-Attention + Feed-Forward (SwiGLU/GeLU) + Residuals + LayerNorm. Processes all tokens in parallel.</p>

        <h4>4. Output Head</h4>
        <p>Final hidden states → unembedding matrix → logits over vocabulary → softmax → probability distribution over next token.</p>

        <h4>5. Sampling / Decoding</h4>
        <p>Greedy (argmax), Temperature sampling, Top-k, Top-p (nucleus), Beam search. Controls creativity vs. coherence.</p>

        <h4>Training Phases</h4>
        <ol>
          <li><strong>Pre-training</strong> — Next-token prediction on trillion-token corpus (Common Crawl, books, code, Wikipedia). Learns world knowledge, reasoning patterns, language. Cost: $10M–$100M+.</li>
          <li><strong>Supervised Fine-Tuning (SFT)</strong> — Instruction/response pairs. Teaches chat format, following instructions.</li>
          <li><strong>RLHF / DPO / ORPO</strong> — Preference optimization. Human/feedback ranks outputs → reward model → policy optimization. Aligns with human values.</li>
        </ol>

        <h4>Key Insight</h4>
        <p>LLMs don't "know" facts — they model <code>P(token | context)</code>. Hallucinations are high-probability but false continuations. They compress training data into statistical patterns, not a database.</p>
      `,
      tags: ['Intermediate', 'Core Concept']
    },
    {
      id: 'rag',
      category: 'generative',
      question: "What is RAG (Retrieval-Augmented Generation) and how do I build it?",
      answer: `
        <p><strong>RAG</strong> grounds LLM generation in retrieved documents, reducing hallucinations and enabling domain-specific, citeable answers.</p>

        <h4>Architecture</h4>
        <pre><code>User Query
    ↓
[Embed Query] → Vector Search → Top-K Chunks
    ↓
[Construct Prompt] = System Prompt + Retrieved Context + Query
    ↓
[LLM Generation] → Answer + Citations</code></pre>

        <h4>Core Components</h4>
        <ol>
          <li><strong>Document Ingestion</strong> — Load → Chunk → Embed → Index</li>
          <li><strong>Retrieval</strong> — Vector search (semantic) + optionally keyword/BM25 (hybrid)</li>
          <li><strong>Re-ranking</strong> — Cross-encoder scores top-K for precision</li>
          <li><strong>Generation</strong> — LLM answers using <em>only</em> provided context</li>
        </ol>

        <h4>Chunking Strategies</h4>
        <ul>
          <li><strong>Fixed-size</strong> (512 tokens, 10% overlap) — Simple, works okay</li>
          <li><strong>Semantic</strong> — Split on topic boundaries (LLM-based or embedding similarity)</li>
          <li><strong>Hierarchical</strong> — Parent chunks for retrieval, child chunks for context</li>
          <li><strong>Document-aware</strong> — Preserve headers, tables, code blocks</li>
        </ul>

        <h4>Advanced RAG Patterns</h4>
        <ul>
          <li><strong>Query Rewriting</strong> — LLM rewrites/expands query before search</li>
          <li><strong>HyDE</strong> — Generate hypothetical answer, embed that for search</li>
          <li><strong>Multi-hop</strong> — Iterative retrieval for complex questions</li>
          <li><strong>Graph RAG</strong> — Knowledge graph + vector search</li>
          <li><strong>Agentic RAG</strong> — LLM decides when/what to search</li>
        </ul>

        <h4>Minimal Working Example (LangChain)</h4>
        <pre><code>from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA

# 1. Load & chunk
docs = TextLoader("data/").load()
chunks = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200).split_documents(docs)

# 2. Embed & index
vectordb = Chroma.from_documents(chunks, OpenAIEmbeddings(), persist_dir="./db")

# 3. RAG chain
qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o-mini", temperature=0),
    retriever=vectordb.as_retriever(search_kwargs={"k": 4}),
    return_source_documents=True
)

result = qa.invoke({"query": "What's our refund policy?"})
print(result["result"])
print([d.metadata for d in result["source_documents"]])</code></pre>

        <h4>Evaluation Metrics</h4>
        <ul>
          <li><strong>Retrieval:</strong> Recall@K, MRR, nDCG</li>
          <li><strong>Generation:</strong> Faithfulness (answer supported by context), Answer Relevancy</li>
          <li><strong>End-to-end:</strong> RAGAS, TruLens, custom human eval</li>
        </ul>
      `,
      tags: ['Advanced', 'Practical']
    },
    {
      id: 'prompt-engineering',
      category: 'generative',
      question: "What are the most effective prompt engineering techniques?",
      answer: `
        <p>Prompt engineering is <strong>programming in natural language</strong>. Structure matters more than clever phrasing.</p>

        <h4>Core Principles</h4>
        <ol>
          <li><strong>Be specific</strong> — "Write a blog post" → "Write a 800-word technical blog post for senior engineers about RAG evaluation, with code examples, skeptical tone"</li>
          <li><strong>Provide context</strong> — Role, audience, constraints, examples, background info</li>
          <li><strong>Structure output</strong> — "Respond in JSON: {summary, key_points[], risks[]}"</li>
          <li><strong>Iterate</strong> — Treat prompts like code: version, test, refine</li>
        </ol>

        <h4>High-Impact Patterns</h4>

        <h5>1. Chain-of-Thought (CoT)</h5>
        <p><code>"Think step by step."</code> or explicit: <code>"First, identify the key entities. Then, determine relationships. Finally, synthesize the answer."</code></p>
        <p>Forces model to use compute for reasoning. <strong>Zero-shot CoT</strong> works surprisingly well.</p>

        <h5>2. Few-Shot / In-Context Learning</h5>
        <pre><code>Classify sentiment: Positive / Negative / Neutral

Review: "Love this product!" → Positive
Review: "Terrible, broke in a day." → Negative
Review: "It works as expected." → Neutral
Review: "The battery life is amazing but the screen is dim." →</code></pre>
        <p>Examples teach pattern + format. 3–10 diverse examples usually sufficient.</p>

        <h5>3. Structured Output (JSON/Schema)</h5>
        <pre><code>Extract entities as JSON:
{
  "people": ["string"],
  "organizations": ["string"],
  "locations": ["string"],
  "dates": ["ISO8601"]
}

Text: "Apple's Tim Cook announced..."</code></pre>
        <p>Use <code>response_format={"type": "json_object"}</code> (OpenAI) or Pydantic/Instructor for validation.</p>

        <h5>4. System Prompts</h5>
        <pre><code>You are a senior security engineer. You:
- Prioritize actionable, specific advice
- Flag assumptions explicitly
- Cite CVEs/standards when relevant
- Never suggest "security through obscurity"</code></pre>

        <h5>5. Self-Consistency / Self-Correction</h5>
        <p>Run same prompt multiple times (temperature > 0), take majority vote. Or: <code>"Review your previous answer for errors. Correct them."</code></p>

        <h4>Advanced: Prompt Optimization</h4>
        <ul>
          <li><strong>DSPy</strong> — Programmatic prompt optimization (compile prompts like code)</li>
          <li><strong>APE / OPRO</strong> — LLMs optimize their own prompts</li>
          <li><strong>Soft Prompts</strong> — Learnable continuous embeddings prepended to input</li>
        </ul>

        <h4>Testing Prompts</h4>
        <pre><code># Use a test harness
test_cases = [
    {"input": "...", "expected_contains": "...", "forbidden": "..."},
    ...
]
for tc in test_cases:
    out = llm(prompt.format(**tc))
    assert tc["expected_contains"] in out
    assert tc["forbidden"] not in out</code></pre>
      `,
      tags: ['Practical', 'Beginner']
    },
    {
      id: 'local-llm',
      category: 'generative',
      question: "How can I run LLMs locally on my machine?",
      answer: `
        <p>Running LLMs locally gives you <strong>privacy, zero cost, offline access, and full control</strong>. Here's the landscape:</p>

        <h4>Recommended Tools (Easiest → Most Control)</h4>

        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Tool</th><th style="text-align:left; padding:0.5rem;">Interface</th><th style="text-align:left; padding:0.5rem;">Models</th><th style="text-align:left; padding:0.5rem;">Best For</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Ollama</strong></td><td style="padding:0.5rem;">CLI, REST API, GUI</td><td style="padding:0.5rem;">Llama, Mistral, Qwen, Phi, Gemma, CodeLlama...</td><td style="padding:0.5rem;">Developers, quick start</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>LM Studio</strong></td><td style="padding:0.5rem;">Desktop GUI + local server</td><td style="padding:0.5rem;">Huge HuggingFace library</td><td style="padding:0.5rem;">Non-technical users, model comparison</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>llama.cpp</strong></td><td style="padding:0.5rem;">CLI, C/C++ lib, Python bindings</td><td style="padding:0.5rem;">GGUF format (quantized)</td><td style="padding:0.5rem;">Maximum performance, embedding</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>llamafile</strong></td><td style="padding:0.5rem;">Single executable</td><td style="padding:0.5rem;">Pre-packaged models</td><td style="padding:0.5rem;">Portability, zero install</td></tr>
            <tr><td style="padding:0.5rem;"><strong>vLLM / TGI</strong></td><td style="padding:0.5rem;">OpenAI-compatible server</td><td style="padding:0.5rem;">Any HF model</td><td style="padding:0.5rem;">Production serving, high throughput</td></tr>
          </tbody>
        </table>

        <h4>Quick Start with Ollama</h4>
        <pre><code># Install: https://ollama.ai (macOS/Windows/Linux)

# Pull a model (auto-quantized)
ollama pull llama3.1:8b        # 4.7 GB, great general purpose
ollama pull qwen2.5:7b         # 4.4 GB, strong coding/math
ollama pull phi3.5:3.8b        # 2.2 GB, tiny but capable
ollama pull codellama:13b      # 7.3 GB, code specialist

# Run interactively
ollama run llama3.1:8b

# Or use as API server
ollama serve
# POST http://localhost:11434/api/generate</code></pre>

        <h4>Quantization Guide</h4>
        <p>GGUF files come in quantization levels (lower = smaller, faster, slightly dumber):</p>
        <ul>
          <li><strong>Q4_K_M</strong> — <em>Sweet spot</em>. 4-bit, ~2.5 GB for 7B. Recommended default.</li>
          <li><strong>Q5_K_M</strong> — 5-bit, ~3 GB. Better quality.</li>
          <li><strong>Q8_0</strong> — 8-bit, ~7 GB. Near-fp16 quality.</li>
          <li><strong>FP16/BF16</strong> — Full precision. 14 GB for 7B. Only if VRAM allows.</li>
        </ul>

        <h4>Hardware Requirements</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Model Size</th><th style="text-align:left; padding:0.5rem;">Q4_K_M (VRAM/RAM)</th><th style="text-align:left; padding:0.5rem;">FP16 (VRAM)</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">3B–4B</td><td style="padding:0.5rem;">2–3 GB</td><td style="padding:0.5rem;">8 GB</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">7B–8B</td><td style="padding:0.5rem;">5–6 GB</td><td style="padding:0.5rem;">16 GB</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">13B–14B</td><td style="padding:0.5rem;">8–10 GB</td><td style="padding:0.5rem;">28 GB</td></tr>
            <tr><td style="padding:0.5rem;">32B–34B</td><td style="padding:0.5rem;">18–20 GB</td><td style="padding:0.5rem;">64 GB+</td></tr>
          </tbody>
        </table>
        <p><strong>Rule:</strong> Model fits in VRAM → fast (GPU). Spills to RAM → slow (CPU offload). Apple Silicon (unified memory) excels here.</p>

        <h4>OpenAI-Compatible API</h4>
        <p>Most tools expose <code>/v1/chat/completions</code> — drop-in replacement for OpenAI SDK:</p>
        <pre><code>from openai import OpenAI
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
client.chat.completions.create(model="llama3.1:8b", messages=[...])</code></pre>
      `,
      tags: ['Practical', 'Beginner']
    },
    {
      id: 'agents',
      category: 'generative',
      question: "What are AI agents and how do they differ from chatbots?",
      answer: `
        <p><strong>Chatbot:</strong> Reacts to user input → generates response. Stateless, single-turn or simple history.</p>
        <p><strong>Agent:</strong> <strong>Autonomously plans, acts, observes, and iterates</strong> to achieve a goal. Has <strong>agency</strong>.</p>

        <h4>Agent Architecture</h4>
        <pre><code>┌─────────────────────────────────────┐
│           LLM (Planner)            │
│  - Understands goal                │
│  - Chooses tools                   │
│  - Reasons about results           │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
   ┌─────────┐   ┌─────────┐
   │ Tools   │   │ Memory  │
   │ - Search│   │ - Short │
   │ - Code  │   │ - Long  │
   │ - API   │   │ - Episodic│
   └────┬────┘   └────┬────┘
        │             │
        └──────┬──────┘
               ▼
        Environment
        (Web, FS, DB, APIs)</code></pre>

        <h4>Core Capabilities</h4>
        <ol>
          <li><strong>Planning</strong> — Decompose goal into steps (ReAct, Plan-and-Execute, Tree-of-Thought)</li>
          <li><strong>Tool Use</strong> — Call functions: search, code exec, API, browser, DB</li>
          <li><strong>Memory</strong> — Short-term (context), Long-term (vector store), Episodic (past runs)</li>
          <li><strong>Reflection</strong> — Self-critique, error correction, retry</li>
          <li><strong>Multi-agent</strong> — Specialized agents collaborate (coder, reviewer, researcher)</li>
        </ol>

        <h4>Popular Frameworks</h4>
        <ul>
          <li><strong>LangGraph</strong> — Stateful, cyclic graphs. Best for complex workflows.</li>
          <li><strong>AutoGen</strong> — Multi-agent conversations. Microsoft.</li>
          <li><strong>CrewAI</strong> — Role-based agents. Easy to start.</li>
          <li><strong>OpenAI Assistants API</strong> — Built-in tools (code interpreter, file search, functions).</li>
          <li><strong>Semantic Kernel</strong> — Microsoft, enterprise-focused.</li>
          <li><strong>LangChain LCEL / Runnable</strong> — Composable chains, streaming.</li>
        </ul>

        <h4>Simple ReAct Agent (LangGraph)</h4>
        <pre><code>from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for current info."""
    # ... implementation
    return results

@tool
def calculator(expr: str) -> float:
    """Evaluate math expressions."""
    return eval(expr)

tools = [search_web, calculator]
llm = ChatOpenAI(model="gpt-4o-mini").bind_tools(tools)

def agent_node(state):
    return {"messages": [llm.invoke(state["messages"])]}

def tool_node(state):
    return {"messages": [tool.invoke(state["messages"][-1].tool_calls) for tool in tools]}

graph = StateGraph(MessagesState)
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)
graph.add_edge("agent", "tools")
graph.add_conditional_edges("tools", lambda x: "agent" if x["messages"][-1].tool_calls else END)
graph.set_entry_point("agent")
app = graph.compile()

app.invoke({"messages": [HumanMessage(content="What's 25 * 47 + current Bitcoin price?")]})</code></pre>

        <h4>When to Use Agents</h4>
        <ul>
          <li>Multi-step problems requiring tools</li>
          <li>Open-ended research / coding tasks</li>
          <li>Workflow automation with decisions</li>
          <li>Interactive problem solving</li>
        </ul>
        <p><strong>Don't use</strong> for simple Q&A, classification, or single-turn generation — overhead not worth it.</p>
      `,
      tags: ['Advanced', 'Practical']
    },

    // APPLICATIONS
    {
      id: 'ai-healthcare',
      category: 'applications',
      question: "How is AI transforming healthcare and medicine?",
      answer: `
        <p>AI in healthcare is one of the highest-impact applications — spanning <strong>diagnosis, drug discovery, personalized treatment, and operational efficiency</strong>.</p>

        <h4>Key Areas</h4>
        <ol>
          <li><strong>Medical Imaging</strong> — Radiology (chest X-ray, CT, MRI), pathology, dermatology, ophthalmology. FDA-cleared algorithms for triage, detection, quantification. Examples: Aidoc, Zebra Medical, Google Health mammography.</li>
          <li><strong>Drug Discovery</strong> — Target identification, molecular generation, protein folding (AlphaFold 3), clinical trial optimization. Companies: Recursion, Insilico, Isomorphic Labs, BenevolentAI.</li>
          <li><strong>Clinical Decision Support</strong> — Sepsis prediction, deterioration alerts, treatment recommendations (IBM Watson Health legacy, Epic/Clinithink).</li>
          <li><strong>Digital Pathology</strong> — Whole-slide imaging + AI for cancer grading, biomarker quantification.</li>
          <li><strong>Genomics & Precision Medicine</strong> — Variant interpretation, polygenic risk scores, therapy matching.</li>
          <li><strong>Ambient Clinical Intelligence</strong> — Automated scribing (Nuance DAX, Abridge, Nabla), coding, documentation.</li>
          <li><strong>Remote Monitoring</strong> — Wearables + AI for arrhythmia detection (Apple Watch, AliveCor), chronic disease management.</li>
        </ol>

        <h4>Regulatory Landscape</h4>
        <ul>
          <li><strong>FDA</strong> — SaMD (Software as Medical Device) framework. 500+ AI/ML-enabled devices authorized (mostly radiology).</li>
          <li><strong>EU MDR</strong> — Stricter clinical evidence requirements.</li>
          <li><strong>Key Challenge:</strong> Continuous learning vs. locked algorithms. FDA's Predetermined Change Control Plan (PCCP).</li>
        </ul>

        <h4>Barriers to Adoption</h4>
        <ul>
          <li>Data silos, interoperability (FHIR helps)</li>
          <li>Validation on diverse populations (bias)</li>
          <li>Clinician trust & workflow integration</li>
          <li>Reimbursement pathways (CPT codes emerging)</li>
          <li>Liability & malpractice uncertainty</li>
        </ul>

        <h4>Notable Models</h4>
        <ul>
          <li><strong>Med-PaLM 2</strong> — Google's medical LLM, passes USMLE</li>
          <li><strong>GatorTron</strong> — Clinical NLP on 90B tokens</li>
          <li><strong>BioGPT, ClinicalBERT</strong> — Domain-adapted transformers</li>
          <li><strong>AlphaFold 3</strong> — Protein-ligand, DNA, RNA structures</li>
        </ul>
      `,
      tags: ['Healthcare', 'Intermediate']
    },
    {
      id: 'ai-coding',
      category: 'applications',
      question: "How is AI changing software development?",
      answer: `
        <p>AI coding assistants have moved from <strong>autocomplete → chat → agents → autonomous workflows</strong> in just 2 years.</p>

        <h4>Capability Layers</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Layer</th><th style="text-align:left; padding:0.5rem;">Tools</th><th style="text-align:left; padding:0.5rem;">What It Does</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Inline Completion</td><td style="padding:0.5rem;">GitHub Copilot, Codeium, Supermaven, Cursor Tab</td><td style="padding:0.5rem;">Next-line/block prediction in IDE</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Chat / Sidebar</td><td style="padding:0.5rem;">Copilot Chat, Cursor Chat, Cody, Continue</td><td style="padding:0.5rem;">Explain, refactor, generate, debug</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;">Agent / Workflow</td><td style="padding:0.5rem;">Cursor Composer, Windsurf, Cline, Aider, Devin</td><td style="padding:0.5rem;">Multi-file edits, run tests, iterate</td></tr>
            <tr><td style="padding:0.5rem;">Autonomous</td><td style="padding:0.5rem;">Devin, OpenDevin, SWE-agent, Factory</td><td style="padding:0.5rem;">Issue → PR end-to-end</td></tr>
          </tbody>
        </table>

        <h4>What's Actually Working Well</h4>
        <ul>
          <li><strong>Boilerplate & scaffolding</strong> — Tests, configs, DTOs, migrations</li>
          <li><strong>Refactoring</strong> — Rename, extract method, migrate patterns</li>
          <li><strong>Explaining legacy code</strong> — "What does this function do?"</li>
          <li><strong>Test generation</strong> — Unit, integration, property-based</li>
          <li><strong>Documentation</strong> — Docstrings, README, ADRs</li>
          <li><strong>Regex / SQL / GraphQL / Terraform</strong> — Niche languages</li>
        </ul>

        <h4>What Still Struggles</h4>
        <ul>
          <li>Large-scale architecture decisions</li>
          <li>Complex debugging across services</li>
          <li>Novel algorithms / research code</li>
          <li>Security-sensitive code (crypto, auth)</li>
          <li>Maintaining consistency across large codebases</li>
        </ul>

        <h4>Best Practices for Developers</h4>
        <ol>
          <li><strong>Use .cursorrules / .github/copilot-instructions.md</strong> — Project context, conventions, anti-patterns</li>
          <li><strong>Small, verifiable tasks</strong> — "Add endpoint X" not "Build auth system"</li>
          <li><strong>Test-driven prompting</strong> — "Write tests first, then implementation"</li>
          <li><strong>Review everything</strong> — Treat AI as junior dev: fast but needs oversight</li>
          <li><strong>Version control prompts</strong> — Save effective prompts in repo</li>
        </ol>

        <h4>Emerging: Spec-Driven Development</h4>
        <pre><code># SPEC.md → AI generates implementation + tests → Human reviews → Merge
# Tools: SpecifAI, GPT-Engineer, Pythagora, OpenDevin</code></pre>
      `,
      tags: ['Coding', 'Practical']
    },
    {
      id: 'ai-creative',
      category: 'applications',
      question: "What are the main AI tools for creative work (images, video, audio, design)?",
      answer: `
        <p>The generative AI creative stack has exploded. Here's the current landscape by modality:</p>

        <h4>🎨 Image Generation</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Tool</th><th style="text-align:left; padding:0.5rem;">Model</th><th style="text-align:left; padding:0.5rem;">Strengths</th><th style="text-align:left; padding:0.5rem;">Access</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Midjourney v6.1</strong></td><td style="padding:0.5rem;">Proprietary</td><td style="padding:0.5rem;">Aesthetic quality, artistic control, --style ref</td><td style="padding:0.5rem;">Discord / Web ($10–120/mo)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>DALL-E 3</strong></td><td style="padding:0.5rem;">OpenAI</td><td style="padding:0.5rem;">Prompt adherence, text rendering, ChatGPT integration</td><td style="padding:0.5rem;">ChatGPT Plus / API</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Flux.1</strong></td><td style="padding:0.5rem;">Black Forest Labs</td><td style="padding:0.5rem;">Open weights, quality ≈ Midjourney, great text</td><td style="padding:0.5rem;">Replicate, fal.ai, local (ComfyUI)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Stable Diffusion 3.5</strong></td><td style="padding:0.5rem;">Stability AI</td><td style="padding:0.5rem;">Open, customizable, ControlNet ecosystem</td><td style="padding:0.5rem;">Local, API, HuggingFace</td></tr>
            <tr><td style="padding:0.5rem;"><strong>Ideogram 2.0</strong></td><td style="padding:0.5rem;">Ideogram</td><td style="padding:0.5rem;">Best text rendering, graphic design</td><td style="padding:0.5rem;">Web / API</td></tr>
          </tbody>
        </table>

        <h4>🎬 Video Generation</h4>
        <ul>
          <li><strong>Sora</strong> (OpenAI) — High fidelity, 1080p, 20s. Limited access.</li>
          <li><strong>Runway Gen-3 Alpha</strong> — Fast, expressive, camera controls. Public.</li>
          <li><strong>Luma Dream Machine</strong> — 5s clips, good motion. Free tier.</li>
          <li><strong>Kling</strong> (Kuaishou) — 1080p, 2min, physics-aware. China/Global.</li>
          <li><strong>Pika 1.5</strong> — Effects, region editing, sound.</li>
          <li><strong>Stable Video Diffusion</strong> — Open, local (ComfyUI).</li>
        </ul>

        <h4>🎵 Audio / Music</h4>
        <ul>
          <li><strong>Suno v3.5</strong> — Full songs with vocals from prompt. Best quality.</li>
          <li><strong>Udio</strong> — Strong competitor, longer tracks, stems export.</li>
          <li><strong>MusicGen</strong> (Meta) — Open, controllable (melody, text).</li>
          <li><strong>AudioLDM 2</strong> — Text-to-audio, sound effects.</li>
          <li><strong>ElevenLabs</strong> — Best TTS, voice cloning, dubbing.</li>
          <li><strong>Whisper / WhisperX</strong> — ASR (speech-to-text), diarization.</li>
        </ul>

        <h4>🎭 3D / Design / Motion</h4>
        <ul>
          <li><strong>Spline, Dora, Masterpiece X</strong> — Text-to-3D</li>
          <li><strong>Figma AI / FigJam AI</strong> — UI generation, auto-layout</li>
          <li><strong>Adobe Firefly</strong> — Generative fill, vector recolor, safe commercial</li>
          <li><strong>Canva Magic Studio</strong> — All-in-one design AI</li>
          <li><strong>Runway Gen-3 / Luma</strong> — Image-to-video, motion brush</li>
        </ul>

        <h4>Workflow: ComfyUI</h4>
        <p>Node-based <strong>local</strong> pipeline for SD/Flux/video/audio. Full control, LoRA stacking, ControlNet, IP-Adapter, AnimateDiff. Steep learning curve, unlimited power.</p>

        <h4>Copyright & Commercial Use</h4>
        <ul>
          <li><strong>Midjourney/DALL-E/Adobe:</strong> Subscriber owns output (check terms)</li>
          <li><strong>Open models (Flux, SD):</strong> You own output, but check base model license</li>
          <li><strong>Suno/Udio:</strong> Paid plans grant commercial rights</li>
          <li><strong>Training data disputes ongoing</strong> — Getty vs. Stability, Authors vs. OpenAI</li>
        </ul>
      `,
      tags: ['Creative', 'Tools']
    },

    // ETHICS
    {
      id: 'bias-fairness',
      category: 'ethics',
      question: "How do I detect and mitigate bias in AI systems?",
      answer: `
        <p><strong>Bias</strong> = systematic error causing unfair outcomes for protected groups. <strong>Fairness</strong> = defining and measuring equitable treatment.</p>

        <h4>Types of Bias</h4>
        <ul>
          <li><strong>Historical/Label Bias</strong> — Training data reflects past discrimination (hiring, lending, policing)</li>
          <li><strong>Representation Bias</strong> — Under/over-representation of groups in data</li>
          <li><strong>Measurement Bias</strong> — Proxy labels differ across groups (e.g., healthcare spend as health proxy)</li>
          <li><strong>Aggregation Bias</strong> — One model fits all, but subgroups need different functions</li>
          <li><strong>Deployment Bias</strong> — Context shift between training and production</li>
        </ul>

        <h4>Fairness Definitions (Mutually Exclusive!)</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Metric</th><th style="text-align:left; padding:0.5rem;">Formula</th><th style="text-align:left; padding:0.5rem;">When to Use</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Demographic Parity</strong></td><td style="padding:0.5rem;">P(Ŷ=1|A=0) = P(Ŷ=1|A=1)</td><td style="padding:0.5rem;">Equal selection rates</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Equalized Odds</strong></td><td style="padding:0.5rem;">P(Ŷ=1|Y=y,A=0) = P(Ŷ=1|Y=y,A=1) ∀y</td><td style="padding:0.5rem;">Equal TPR & FPR</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Equal Opportunity</strong></td><td style="padding:0.5rem;">P(Ŷ=1|Y=1,A=0) = P(Ŷ=1|Y=1,A=1)</td><td style="padding:0.5rem;">Equal TPR only</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Calibration</strong></td><td style="padding:0.5rem;">P(Y=1|Ŷ=p,A=0) = P(Y=1|Ŷ=p,A=1)</td><td style="padding:0.5rem;">Score means same thing</td></tr>
            <tr><td style="padding:0.5rem;"><strong>Individual Fairness</strong></td><td style="padding:0.5rem;">Similar x → similar Ŷ</td><td style="padding:0.5rem;">No group labels needed</td></tr>
          </tbody>
        </table>
        <p><strong>Impossibility theorem:</strong> Can't satisfy all three (Demographic Parity, Equalized Odds, Calibration) simultaneously when base rates differ.</p>

        <h4>Detection Toolkit</h4>
        <pre><code># AIF360 (IBM) - comprehensive fairness metrics
from aif360.datasets import AdultDataset
from aif360.metrics import BinaryLabelDatasetMetric, ClassificationMetric

# Fairlearn (Microsoft) - mitigation + visualization
from fairlearn.metrics import MetricFrame, demographic_parity_difference
from fairlearn.reductions import ExponentiatedGradient, DemographicParity

# SHAP / LIME for feature-level bias
import shap
shap_values = shap.Explainer(model).shap_values(X)
shap.dependence_plot("race", shap_values, X)</code></pre>

        <h4>Mitigation Strategies</h4>
        <ol>
          <li><strong>Pre-processing</strong> — Reweight, resample, disentangle representations (Fairlearn, AIF360)</li>
          <li><strong>In-processing</strong> — Constrained optimization, adversarial debiasing, regularization</li>
          <li><strong>Post-processing</strong> — Threshold adjustment per group (Hardt et al.)</li>
        </ol>

        <h4>Practical Checklist</h4>
        <ul>
          <li>☐ Define protected attributes & fairness criteria <em>before</em> modeling</li>
          <li>☐ Audit data: representation, label distributions, proxy quality</li>
          <li>☐ Disaggregate metrics by subgroup (not just overall accuracy)</li>
          <li>☐ Test on held-out slices / stress sets</li>
          <li>☐ Document trade-offs: accuracy vs. fairness, which metric prioritized</li>
          <li>☐ Monitor in production — drift detection on fairness metrics</li>
          <li>☐ Human-in-the-loop for high-stakes decisions</li>
        </ul>
      `,
      tags: ['Ethics', 'Advanced']
    },
    {
      id: 'ai-alignment',
      category: 'ethics',
      question: "What is AI alignment and why does it matter?",
      answer: `
        <p><strong>Alignment</strong> = ensuring AI systems pursue goals that match human values and intentions — reliably, even as capabilities scale.</p>

        <h4>The Core Problem</h4>
        <p><strong>Specification Gaming / Reward Hacking:</strong> AI optimizes the literal objective, not the intended one.</p>
        <ul>
          <li>Boat racing game → circles for points instead of finishing</li>
          <li>Robot hand → hovers near object instead of grasping (easier to fake)</li>
          <li>LLM → sycophantic answers that please user but are wrong</li>
        </ul>

        <h4>Alignment Taxonomy</h4>
        <ol>
          <li><strong>Outer Alignment</strong> — Is the reward/loss function correct? (Specification)</li>
          <li><strong>Inner Alignment</strong> — Does the trained model actually optimize that objective? (Mesa-optimization)</li>
          <li><strong>Scalable Oversight</strong> — How to supervise systems smarter than evaluators?</li>
          <li><strong>Robustness</strong> — Alignment holds under distribution shift, adversarial inputs</li>
          <li><strong>Interpretability</strong> — Can we understand <em>why</em> the model decides?</li>
        </ol>

        <h4>Current Approaches</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Approach</th><th style="text-align:left; padding:0.5rem;">Mechanism</th><th style="text-align:left; padding:0.5rem;">Status</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>RLHF / DPO / ORPO</strong></td><td style="padding:0.5rem;">Human preferences → reward model → policy optimization</td><td style="padding:0.5rem;">Standard for chat models</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Constitutional AI</strong></td><td style="padding:0.5rem;">AI critiques itself per principles (Anthropic)</td><td style="padding:0.5rem;">Claude, reduces human labeling</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>RLAIF</strong></td><td style="padding:0.5rem;">AI-generated feedback instead of human</td><td style="padding:0.5rem;">Scaling supervision</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Process Supervision</strong></td><td style="padding:0.5rem;">Reward reasoning steps, not just outcome</td><td style="padding:0.5rem;">Math, code (OpenAI o1)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Weak-to-Strong Generalization</strong></td><td style="padding:0.5rem;">Small model supervises large model</td><td style="padding:0.5rem;">OpenAI research direction</td></tr>
            <tr><td style="padding:0.5rem;"><strong>Mechanistic Interpretability</strong></td><td style="padding:0.5rem;">Reverse-engineer circuits/neurons (SAEs, probing)</td><td style="padding:0.5rem;">Early, promising (Anthropic, Neel Nanda)</td></tr>
          </tbody>
        </table>

        <h4>Why It Matters Now</h4>
        <ul>
          <li>Frontier models show <strong>emergent capabilities</strong> (reasoning, planning, deception)</li>
          <li><strong>Autonomous agents</strong> can take actions in the world (code exec, APIs, browsing)</li>
          <li><strong>Scaling laws</strong> suggest continued rapid capability growth</li>
          <li><strong>Misalignment risk</strong> compounds with capability: a slightly misaligned superintelligence is catastrophic</li>
        </ul>

        <h4>Key Research Orgs</h4>
        <ul>
          <li><strong>Anthropic</strong> — Constitutional AI, interpretability, scaling laws</li>
          <li><strong>OpenAI</strong> — Superalignment team (dissolved, redistributed), RLHF, process supervision</li>
          <li><strong>DeepMind</strong> — Scalable oversight, debate, recursive reward modeling</li>
          <li><strong>CAIS / CHAI / FAR AI</strong> — Academic alignment research</li>
          <li><strong>MATS / ARENA / SERI MATS</strong> — Training programs for alignment researchers</li>
        </ul>
      `,
      tags: ['Ethics', 'Advanced', 'Research']
    },
    {
      id: 'privacy-ai',
      category: 'ethics',
      question: "How do I protect privacy when using AI with sensitive data?",
      answer: `
        <p>Privacy in AI spans <strong>training data, inference-time inputs, model outputs, and model weights</strong>.</p>

        <h4>Threat Models</h4>
        <ul>
          <li><strong>Membership Inference</strong> — Was this record in training data?</li>
          <li><strong>Data Extraction</strong> — Recover training examples from model (memorization)</li>
          <li><strong>Attribute Inference</strong> — Predict sensitive attributes from outputs</li>
          <li><strong>Model Inversion</strong> — Reconstruct input from embeddings/logits</li>
          <li><strong>Inference-Time Leakage</strong> — Prompts/logs sent to API providers</li>
        </ul>

        <h4>Technical Defenses</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Technique</th><th style="text-align:left; padding:0.5rem;">What It Protects</th><th style="text-align:left; padding:0.5rem;">Trade-off</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Differential Privacy (DP-SGD)</strong></td><td style="padding:0.5rem;">Training data membership</td><td style="padding:0.5rem;">Accuracy loss, slow training</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Federated Learning</strong></td><td style="padding:0.5rem;">Raw data never leaves device</td><td style="padding:0.5rem;">Comm cost, heterogeneity, poisoning</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Synthetic Data</strong></td><td style="padding:0.5rem;">Replace real data with generated</td><td style="padding:0.5rem;">Utility/fidelity gap, privacy not guaranteed</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Homomorphic Encryption</strong></td><td style="padding:0.5rem;">Compute on encrypted data</td><td style="padding:0.5rem;">1000–10000× slowdown</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Secure Enclaves (TEE)</strong></td><td style="padding:0.5rem;">Inference on encrypted data in hardware</td><td style="padding:0.5rem;">Hardware trust, limited memory</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Local Inference</strong></td><td style="padding:0.5rem;">Data never leaves device</td><td style="padding:0.5rem;">Model size limits, no GPU</td></tr>
            <tr><td style="padding:0.5rem;"><strong>PII Redaction / Tokenization</strong></td><td style="padding:0.5rem;">Prompts sent to APIs</td><td style="padding:0.5rem;">Imperfect detection, context loss</td></tr>
          </tbody>
        </table>

        <h4>Practical API Privacy</h4>
        <ol>
          <li><strong>Zero-retention endpoints</strong> — OpenAI, Anthropic offer no-logging guarantees (enterprise)</li>
          <li><strong>PII stripping</strong> — Presidio, Microsoft Presidio, AWS Comprehend, custom NER before sending</li>
          <li><strong>Data Processing Agreements (DPA)</strong> — Required for GDPR Art. 28</li>
          <li><strong>Regional endpoints</strong> — EU data stays in EU (Azure OpenAI, Bedrock)</li>
        </ol>

        <h4>Regulatory Landscape</h4>
        <ul>
          <li><strong>GDPR</strong> — Lawful basis, DPIA for high-risk AI, right to explanation (Art. 22)</li>
          <li><strong>EU AI Act</strong> — High-risk AI systems: data governance, transparency, human oversight</li>
          <li><strong>HIPAA</strong> — PHI protection, BAA with vendors</li>
          <li><strong>CCPA/CPRA</strong> — Opt-out, deletion, sensitive data limits</li>
        </ul>

        <h4>Decision Tree</h4>
        <pre><code>Is data highly sensitive (PII, PHI, financial, proprietary)?
├── YES → Can you run locally? (Ollama, llama.cpp, vLLM)
│   ├── YES → Local inference. Best privacy.
│   └── NO  → Zero-retention API + PII redaction + DPA + encryption
└── NO  → Standard API OK. Consider synthetic data for training.</code></pre>
      `,
      tags: ['Ethics', 'Practical', 'Privacy']
    },

    // TOOLS
    {
      id: 'vector-db',
      category: 'tools',
      question: "Which vector database should I choose for my RAG application?",
      answer: `
        <p>Vector databases enable <strong>semantic search at scale</strong> — the retrieval backbone of RAG.</p>

        <h4>Comparison Matrix</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.85rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Database</th><th style="text-align:left; padding:0.5rem;">Type</th><th style="text-align:left; padding:0.5rem;">Scale</th><th style="text-align:left; padding:0.5rem;">Key Features</th><th style="text-align:left; padding:0.5rem;">Pricing</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Chroma</strong></td><td style="padding:0.5rem;">OSS / Cloud</td><td style="padding:0.5rem;">~1M vectors</td><td style="padding:0.5rem;">Simple, Python-first, embedded mode, great for dev</td><td style="padding:0.5rem;">Free / $0.03/hr</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Pinecone</strong></td><td style="padding:0.5rem;">Managed</td><td style="padding:0.5rem;">Billions</td><td style="padding:0.5rem;">Serverless, hybrid search, namespaces, SOC2</td><td style="padding:0.5rem;">Free tier / $0.096/hr</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Weaviate</strong></td><td style="padding:0.5rem;">OSS / Cloud</td><td style="padding:0.5rem;">Billions</td><td style="padding:0.5rem;">GraphQL/REST, modules (text2vec, generative), multi-tenancy</td><td style="padding:0.5rem;">Free / $25/mo+</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Qdrant</strong></td><td style="padding:0.5rem;">OSS / Cloud</td><td style="padding:0.5rem;">Billions</td><td style="padding:0.5rem;">Rust, fast, filtering, payload, quantization, sharding</td><td style="padding:0.5rem;">Free / $0.10/hr</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Milvus / Zilliz</strong></td><td style="padding:0.5rem;">OSS / Cloud</td><td style="padding:0.5rem;">Trillions</td><td style="padding:0.5rem;">Distributed, multiple index types, GPU support</td><td style="padding:0.5rem;">Free / $0.20/hr</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>pgvector</strong></td><td style="padding:0.5rem;">PostgreSQL ext</td><td style="padding:0.5rem;">~10M</td><td style="padding:0.5rem;">SQL + vectors together, ACID, familiar stack</td><td style="padding:0.5rem;">PostgreSQL cost</td></tr>
            <tr><td style="padding:0.5rem;"><strong>LanceDB</strong></td><td style="padding:0.5rem;">OSS / Cloud</td><td style="padding:0.5rem;">Billions</td><td style="padding:0.5rem;">Columnar (Lance format), embedded, multimodal, fast scans</td><td style="padding:0.5rem;">Free / $0.10/hr</td></tr>
          </tbody>
        </table>

        <h4>Selection Guide</h4>
        <ul>
          <li><strong>Prototype / Small scale / Python-only</strong> → <strong>Chroma</strong> (embedded mode, zero config)</li>
          <li><strong>Production / Managed / Enterprise</strong> → <strong>Pinecone</strong> (easiest ops) or <strong>Weaviate Cloud</strong></li>
          <li><strong>High performance / Self-host / Rust stack</strong> → <strong>Qdrant</strong></li>
          <li><strong>Massive scale / Distributed / GPU</strong> → <strong>Milvus / Zilliz</strong></li>
          <li><strong>Already on Postgres / Want SQL + Vector</strong> → <strong>pgvector</strong> (HNSW/IVFFlat)</li>
          <li><strong>Multimodal / Columnar analytics / Embedded</strong> → <strong>LanceDB</strong></li>
        </ul>

        <h4>Index Types (Under the Hood)</h4>
        <ul>
          <li><strong>HNSW</strong> — Hierarchical Navigable Small World. Gold standard for accuracy/speed. Used by most.</li>
          <li><strong>IVF / IVFPQ</strong> — Inverted File + Product Quantization. Faster build, lower recall. Good for billions.</li>
          <li><strong>DiskANN / FreshDiskANN</strong> — SSD-optimized. Low memory, high scale.</li>
          <li><strong>Binary / Scalar Quantization</strong> — Compress vectors 8–32×. Small recall hit, huge RAM savings.</li>
        </ul>

        <h4>Hybrid Search = Better RAG</h4>
        <p>Combine <strong>semantic (vector)</strong> + <strong>keyword (BM25)</strong> + <strong>metadata filters</strong>.</p>
        <pre><code># Weaviate hybrid example
result = client.query.get("Document", ["content", "source"])
    .with_hybrid(query="AI safety", alpha=0.7)  # 0.7 = 70% vector, 30% BM25
    .with_where({"path": "category", "operator": "Equal", "valueString": "research"})
    .with_limit(5)
    .do()</code></pre>
      `,
      tags: ['Tools', 'Practical']
    },
    {
      id: 'llm-ops',
      category: 'tools',
      question: "What tools do I need for LLM observability and evaluation in production?",
      answer: `
        <p>LLMOps = <strong>Observability + Evaluation + Guardrails + Prompt/Experiment Management</strong>.</p>

        <h4>Category 1: Observability & Tracing</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Tool</th><th style="text-align:left; padding:0.5rem;">Focus</th><th style="text-align:left; padding:0.5rem;">Open Source</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Langfuse</strong></td><td style="padding:0.5rem;">Traces, evals, prompt mgmt, analytics</td><td style="padding:0.5rem;">✅ (AGPL)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>LangSmith</strong></td><td style="padding:0.5rem;">Traces, testing, datasets, prompt hub</td><td style="padding:0.5rem;">❌ (LangChain)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Phoenix (Arize)</strong></td><td style="padding:0.5rem;">Traces, evals, drift, embeddings viz</td><td style="padding:0.5rem;">✅ (Apache 2.0)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Weights & Biases</strong></td><td style="padding:0.5rem;">MLOps + LLM traces, evals, prompt versioning</td><td style="padding:0.5rem;">❌</td></tr>
            <tr><td style="padding:0.5rem;"><strong>Helicone</strong></td><td style="padding:0.5rem;">Proxy logging, caching, costs, analytics</td><td style="padding:0.5rem;">✅ (MIT)</td></tr>
          </tbody>
        </table>

        <h4>Category 2: Evaluation Frameworks</h4>
        <ul>
          <li><strong>RAGAS</strong> — Faithfulness, Answer Relevancy, Context Precision/Recall. Reference-free.</li>
          <li><strong>DeepEval</strong> — 14+ metrics, Pytest integration, CI/CD ready.</li>
          <li><strong>TruLens</strong> — Feedback functions, structured eval, streaming.</li>
          <li><strong>Promptfoo</strong> — CLI/GitHub Action for prompt regression testing. YAML configs.</li>
          <li><strong>OpenAI Evals</strong> — JSONL benchmarks, model-graded evals.</li>
        </ul>

        <h4>Category 3: Guardrails & Safety</h4>
        <ul>
          <li><strong>Guardrails AI</strong> — Pydantic-style validation, rail spec, validators (regex, LLM, API).</li>
          <li><strong>NeMo Guardrails (NVIDIA)</strong> — Colang dialogue flows, topical, safety, hallucination rails.</li>
          <li><strong>Llama Guard / ShieldGemma</strong> — Classifier models for safety categories.</li>
          <li><strong>Presidio</strong> — PII detection/anonymization (Microsoft).</li>
        </ul>

        <h4>Category 4: Prompt & Experiment Management</h4>
        <ul>
          <li><strong>Langfuse / LangSmith / Phoenix</strong> — Built-in prompt versioning, playground, datasets.</li>
          <li><strong>DSPy</strong> — Programmatic prompt optimization (compile prompts like code).</li>
          <li><strong>PromptLayer</strong> — Prompt registry, A/B testing, analytics.</li>
        </ul>

        <h4>Recommended Stack (2024)</h4>
        <pre><code># Open-source friendly
Tracing:     Langfuse (self-hosted) or Phoenix
Evaluation:  RAGAS + DeepEval (CI/CD)
Guardrails:  Guardrails AI + Llama Guard
Prompts:     Langfuse prompt management
Experiments: MLflow or W&B for model training</code></pre>

        <h4>Key Metrics to Track</h4>
        <ul>
          <li><strong>Latency</strong> — p50, p95, p99 per endpoint</li>
          <li><strong>Cost</strong> — $/1K tokens, $/request, by model/user/feature</li>
          <li><strong>Quality</strong> — Faithfulness, Relevancy, Hallucination rate (sampled)</li>
          <li><strong>Errors</strong> — Rate, types (timeout, rate limit, validation fail)</li>
          <li><strong>User Feedback</strong> — 👍/👎, implicit (regeneration, copy), explicit surveys</li>
        </ul>
      `,
      tags: ['Tools', 'Production', 'Advanced']
    },

    // CAREER
    {
      id: 'ai-career-path',
      category: 'career',
      question: "What are the main career paths in AI and how do I choose?",
      answer: `
        <p>AI careers span a spectrum from <strong>research → engineering → product → policy</strong>. Most roles blend several.</p>

        <h4>Core Role Archetypes</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Role</th><th style="text-align:left; padding:0.5rem;">Focus</th><th style="text-align:left; padding:0.5rem;">Typical Background</th><th style="text-align:left; padding:0.5rem;">Key Skills</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>ML Research Scientist</strong></td><td style="padding:0.5rem;">Novel algorithms, architectures, theory. Publications.</td><td style="padding:0.5rem;">PhD (CS, Math, Physics)</td><td style="padding:0.5rem;">Deep math, PyTorch/JAX, paper implementation, creativity</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>ML Engineer (Research)</strong></td><td style="padding:0.5rem;">Scale research prototypes, distributed training, kernels.</td><td style="padding:0.5rem;">MS/PhD, strong engineering</td><td style="padding:0.5rem;">CUDA/Triton, Megatron/FSDP, profiling, HPC</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>ML Engineer (Applied/Product)</strong></td><td style="padding:0.5rem;">Productionize models, pipelines, serving, MLOps.</td><td style="padding:0.5rem;">CS/Eng, SWE background</td><td style="padding:0.5rem;">Python, Docker/K8s, TFX/Kubeflow, monitoring, APIs</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>AI Engineer / LLM Engineer</strong></td><td style="padding:0.5rem;">Prompting, RAG, agents, eval, fine-tuning, integration.</td><td style="padding:0.5rem;">SWE + ML curiosity</td><td style="padding:0.5rem;">LangChain/LangGraph, vector DBs, eval frameworks, APIs</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Data Scientist (ML-heavy)</strong></td><td style="padding:0.5rem;">Modeling tabular data, experimentation, analytics.</td><td style="padding:0.5rem;">Stats/Math/Quant</td><td style="padding:0.5rem;">XGBoost, causal inference, SQL, A/B testing, communication</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>MLOps / Platform Engineer</strong></td><td style="padding:0.5rem;">Infrastructure: feature stores, training clusters, CI/CD.</td><td style="padding:0.5rem;">DevOps + ML</td><td style="padding:0.5rem;">Kubernetes, Ray, MLflow, Feast, Terraform, GPU scheduling</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>AI Product Manager</strong></td><td style="padding:0.5rem;">Strategy, roadmap, UX, metrics, stakeholder alignment.</td><td style="padding:0.5rem;">PM + technical depth</td><td style="padding:0.5rem;">ML literacy, data intuition, prioritization, ethics</td></tr>
            <tr><td style="padding:0.5rem;"><strong>AI Safety / Alignment Researcher</strong></td><td style="padding:0.5rem;">Interpretability, scalable oversight, robustness.</td><td style="padding:0.5rem;">PhD or exceptional portfolio</td><td style="padding:0.5rem;">Mechanistic interp, RLHF, debate, weak-to-strong</td></tr>
          </tbody>
        </table>

        <h4>How to Choose</h4>
        <ol>
          <li><strong>Do you love math & publishing?</strong> → Research Scientist</li>
          <li><strong>Do you love building systems & optimizing?</strong> → ML Engineer (Research/Platform)</li>
          <li><strong>Do you love product & user problems?</strong> → AI Engineer / PM</li>
          <li><strong>Do you love data & experimentation?</strong> → Data Scientist</li>
          <li><strong>Do you love infrastructure & scale?</strong> → MLOps / Platform</li>
        </ol>

        <h4>Breaking In (2024 Reality)</h4>
        <ul>
          <li><strong>Portfolio > Degree.</strong> 3–5 end-to-end projects on GitHub: problem → data → model → eval → deploy.</li>
          <li><strong>Specialize.</strong> "AI Engineer" is hot but crowded. "LLM Eval Specialist" or "RAG Architect" differentiates.</li>
          <li><strong>Open source.</strong> Contribute to LangChain, HuggingFace, vLLM, Ollama, DSPy. Visible proof of skill.</li>
          <li><strong>Write.</strong> Technical blog posts on your projects. Recruiters search for this.</li>
          <li><strong>Network.</strong> Discords (Latent Space, AI Engineer, local meetups), conferences (NeurIPS, ICML, AI Engineer Summit).</li>
        </ul>

        <h4>Compensation Ranges (US, 2024, Total Comp)</h4>
        <ul>
          <li>Research Scientist (PhD): $250k–$600k+</li>
          <li>ML Engineer: $200k–$450k</li>
          <li>AI Engineer: $180k–$350k</li>
          <li>MLOps/Platform: $180k–$350k</li>
          <li>Data Scientist: $150k–$280k</li>
          <li>AI PM: $200k–$400k</li>
        </ul>
      `,
      tags: ['Career', 'Beginner']
    },
    {
      id: 'learning-path',
      category: 'career',
      question: "What's a good self-study curriculum to learn AI/ML in 2024?",
      answer: `
        <p>Here's a <strong>pragmatic, modern curriculum</strong> — skip outdated theory, focus on what's used today.</p>

        <h4>Phase 0: Prerequisites (2–4 weeks)</h4>
        <ul>
          <li><strong>Python:</strong> NumPy, Pandas, Matplotlib, Jupyter. <a href="https://github.com/jerry-git/learn-python" target="_blank">freeCodeCamp</a></li>
          <li><strong>Math refresher:</strong> Linear algebra (vectors, matrices, SVD), Calculus (gradients, chain rule), Probability (Bayes, distributions, KL divergence). <a href="https://github.com/ossu/data-science" target="_blank">Essence of Linear Algebra (3Blue1Brown)</a>, <a href="https://www.statquest.org/" target="_blank">StatQuest</a></li>
          <li><strong>Git/GitHub, Docker basics, CLI comfort</strong></li>
        </ul>

        <h4>Phase 1: ML Foundations (4–6 weeks)</h4>
        <ul>
          <li><strong>Course:</strong> <a href="https://www.coursera.org/specializations/machine-learning-introduction" target="_blank">Andrew Ng ML Specialization (Coursera)</a> — updated 2022, uses TensorFlow</li>
          <li><strong>Book:</strong> <em>Hands-On ML with Scikit-Learn, Keras & TensorFlow</em> (Géron, 3rd ed.) — read Ch 1–8, do exercises</li>
          <li><strong>Practice:</strong> Kaggle "Titanic" → "House Prices" → "Spaceship Titanic". Focus on: EDA, preprocessing, CV, ensembles (XGBoost/LightGBM), error analysis.</li>
        </ul>

        <h4>Phase 2: Deep Learning (6–8 weeks)</h4>
        <ul>
          <li><strong>Course:</strong> <a href="https://course.fast.ai/" target="_blank">fast.ai Practical Deep Learning (free!)</a> — top-down, code-first. Do all lessons.</li>
          <li><strong>Architecture deep-dive:</strong> CNNs, RNNs, Transformers. <a href="https://nn.labml.ai/" target="_blank">Annotated Transformers</a>, <a href="https://github.com/labmlai/annotated_deep_learning_paper_implementations" target="_blank">LabML</a></li>
          <li><strong>PyTorch mastery:</strong> <a href="https://pytorch.org/tutorials/" target="_blank">Official tutorials</a>, build from scratch: autograd, optimizer, DataLoader, DDP.</li>
          <li><strong>Projects:</strong> Image classification (CIFAR-100), NLP (IMDb sentiment), Time-series.</li>
        </ul>

        <h4>Phase 3: LLMs & Generative AI (6–10 weeks) — THE CORE</h4>
        <ul>
          <li><strong>Transformers from scratch:</strong> <a href="https://github.com/karpathy/nanoGPT" target="_blank">karpathy/nanoGPT</a> — read, run, modify.</li>
          <li><strong>Course:</strong> <a href="https://github.com/microsoft/generative-ai-for-beginners" target="_blank">Microsoft Generative AI for Beginners</a> (free, 18 lessons)</li>
          <li><strong>Deep dive topics (pick 3–4):</strong>
            <ul>
              <li>Tokenization (BPE, Unigram) — <a href="https://github.com/huggingface/tokenizers" target="_blank">HF Tokenizers</a></li>
              <li>Pre-training / SFT / RLHF — <a href="https://huggingface.co/blog/rlhf" target="_blank">HF RLHF guide</a></li>
              <li>RAG — build end-to-end (see RAG question)</li>
              <li>Agents — LangGraph, AutoGen, function calling</li>
              <li>Fine-tuning — LoRA/QLoRA on 7B/13B (<a href="https://github.com/huggingface/trl" target="_blank">TRL</a>, <a href="https://github.com/unslothai/unsloth" target="_blank">Unsloth</a>)</li>
              <li>Evaluation — RAGAS, custom LLM-as-judge</li>
              <li>Serving — vLLM, TGI, TensorRT-LLM, batching, quantization</li>
            </ul>
          </li>
          <li><strong>Capstone Project:</strong> Build something real: domain-specific copilot, research agent, eval framework, fine-tuned model.</li>
        </ul>

        <h4>Phase 4: Production & Specialization (Ongoing)</h4>
        <ul>
          <li>MLOps: MLflow, Kubeflow, Ray, Feature Stores (Feast), Monitoring (Evidently, WhyLabs)</li>
          <li>Domain: Healthcare (MIMIC), Finance (time-series), Robotics (Isaac Sim), Science (AlphaFold)</li>
          <li>Read papers daily: <a href="https://huggingface.co/papers" target="_blank">HF Daily Papers</a>, <a href="https://arxiv.org/list/cs.LG/recent" target="_blank">arXiv cs.LG</a>, <a href="https://www.latent.space/" target="_blank">Latent Space podcast</a></li>
        </ul>

        <h4>Free Resources Hall of Fame</h4>
        <ul>
          <li><a href="https://d2l.ai/" target="_blank">Dive into Deep Learning (D2L)</a> — interactive book, PyTorch/TensorFlow/JAX</li>
          <li><a href="https://github.com/practical-intro-to-ml" target="_blank">Practical Intro to ML (NYU)</a></li>
          <li><a href="https://ml-course.fyi/" target="_blank">ML Course (Made with ML)</a></li>
          <li><a href="https://github.com/hewwoo/awesome-mlops" target="_blank">Awesome MLOps</a></li>
          <li><a href="https://github.com/eugeneyan/applied-ml" target="_blank">Eugene Yan's Applied ML</a></li>
        </ul>
      `,
      tags: ['Career', 'Learning', 'Beginner']
    },

    // FUTURE
    {
      id: 'agi-timeline',
      category: 'future',
      question: "When will we achieve AGI? What are the leading predictions?",
      answer: `
        <p><strong>AGI (Artificial General Intelligence)</strong> = AI that matches or exceeds human performance across <strong>all</strong> cognitive tasks. No consensus on timeline — but forecasts have shortened dramatically.</p>

        <h4>Expert Forecasts (2023–2024 Surveys)</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Source</th><th style="text-align:left; padding:0.5rem;">Median AGI Timeline</th><th style="text-align:left; padding:0.5rem;">Key Definition</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Metaculus (community)</strong></td><td style="padding:0.5rem;"><strong>2030–2032</strong></td><td style="padding:0.5rem;">General reasoning across domains</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>AI Impacts (2023 survey, 2778 researchers)</strong></td><td style="padding:0.5rem;"><strong>2047</strong> (50%), <strong>2028</strong> (10%)</td><td style="padding:0.5rem;">Unaided machines accomplish every task better/cheaper</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Grace et al. (2024 update)</strong></td><td style="padding:0.5rem;"><strong>2040</strong> median</td><td style="padding:0.5rem;">High-level machine intelligence (HLMI)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Sam Altman (OpenAI)</strong></td><td style="padding:0.5rem;"><strong>"Within this decade"</strong></td><td style="padding:0.5rem;">Systems that can do what humans can</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Dario Amodei (Anthropic)</strong></td><td style="padding:0.5rem;"><strong>2026–2027</strong></td><td style="padding:0.5rem;">"Powerful AI" — Nobel-level science, coding, reasoning</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Shane Legg (DeepMind co-founder)</strong></td><td style="padding:0.5rem;"><strong>2028–2030</strong></td><td style="padding:0.5rem;">50% by 2028 (said since 2011)</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Geoffrey Hinton</strong></td><td style="padding:0.5rem;"><strong>5–20 years</strong></td><td style="padding:0.5rem;">Changed from 50+ years in 2023</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Yann LeCun</strong></td><td style="padding:0.5rem;"><strong>Decades</strong></td><td style="padding:0.5rem;">Skeptical of current path; needs world models</td></tr>
            <tr><td style="padding:0.5rem;"><strong>Gary Marcus</strong></td><td style="padding:0.5rem;"><strong>Not soon</strong></td><td style="padding:0.5rem;">Symbolic+neural hybrid needed</td></tr>
          </tbody>
        </table>

        <h4>What "AGI" Actually Means — Competing Definitions</h4>
        <ol>
          <li><strong>OpenAI:</strong> "Highly autonomous systems that outperform humans at most economically valuable work"</li>
          <li><strong>DeepMind:</strong> "Flexible, general problem-solving across wide task distribution"</li>
          <li><strong>Anthropic:</strong> "AI that can do everything a human knowledge worker can do"</li>
          <li><strong>Microsoft/OpenAI (reported):</strong> $100B profit-generating system</li>
          <li><strong>Academic (HLMI):</strong> Unaided machines accomplish every task better and more cheaply than human workers</li>
        </ul>

        <h4>Key Milestones on the Path</h4>
        <ul>
          <li><strong>2024–2025:</strong> Reliable agents (multi-step, tool use, memory), multimodal native models</li>
          <li><strong>2025–2026:</strong> Automated AI research (AI improves AI), superhuman coding</li>
          <li><strong>2026–2028:</strong> "Drop-in remote worker" — AI employee replacement for knowledge work</li>
          <li><strong>2028–2032:</strong> Scientific discovery automation (AlphaFold for everything)</li>
          <li><strong>2030+:</strong> Physical world integration (robotics), recursive self-improvement</li>
        </ul>

        <h4>Why Forecasts Differ</h4>
        <ul>
          <li><strong>Definition variance</strong> — "Passes Turing test" vs. "Automates all labor"</li>
          <li><strong>Scaling bets</strong> — Will current paradigm (next-token + RL) suffice, or need breakthroughs?</li>
          <li><strong>Data wall</strong> — High-quality text exhausted; synthetic data, video, self-play?</li>
          <li><strong>Compute / Energy</strong> — Trillion-dollar clusters? Fusion? Landauer limit?</li>
          <li><strong>Regulation / Safety pauses</strong> — Government intervention</li>
        </ul>

        <h4>What to Watch</h4>
        <ul>
          <li><strong>RE-Bench / SWE-Bench / MLE-Bench</strong> — AI doing ML engineering</li>
          <li><strong>ARC-AGI</strong> — Abstract reasoning (Chollet), unsolved by LLMs</li>
          <li><strong>FrontierMath / GPQA</strong> — Expert-level STEM reasoning</li>
          <li><strong>Agent benchmarks</strong> — WebShop, Mind2Web, OSWorld, SWE-bench</li>
        </ul>
      `,
      tags: ['Future', 'Research', 'Advanced']
    },
    {
      id: 'scaling-laws',
      category: 'future',
      question: "What are scaling laws and will they continue to hold?",
      answer: `
        <p><strong>Scaling Laws</strong> (Kaplan et al. 2020, Hoffmann et al. 2022 "Chinchilla") describe predictable power-law relationships between model performance and <strong>3 resources: parameters (N), dataset size (D), compute (C)</strong>.</p>

        <h4>The Core Formula (Chinchilla)</h4>
        <pre><code>L(N, D) = E + A/N^α + B/D^β
# Optimal allocation for compute budget C:
N_opt ∝ C^0.5,  D_opt ∝ C^0.5
# i.e., scale model & data equally!</code></pre>
        <p>Before Chinchilla: models undertrained (GPT-3: 175B params, 300B tokens — should've been ~60B params, 1.4T tokens).</p>

        <h4>What Scaling Laws Predict</h4>
        <ul>
          <li>Test loss → 0 as compute → ∞ (no hard ceiling observed yet)</li>
          <li>Emergent capabilities appear at predictable compute thresholds</li>
          <li>Transfer learning improves with scale</li>
          <li>Sample efficiency improves with scale</li>
        </ul>

        <h4>Will They Continue?</h4>
        <table style="width:100%; border-collapse:collapse; margin:1rem 0; font-size:0.9rem;">
          <thead><tr style="border-bottom:1px solid var(--border);"><th style="text-align:left; padding:0.5rem;">Argument</th><th style="text-align:left; padding:0.5rem;">For Continuation</th><th style="text-align:left; padding:0.5rem;">Against / Limits</th></tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Data</strong></td><td style="padding:0.5rem;">Video (YouTube = 1000T tokens), synthetic data, self-play, multimodal</td><td style="padding:0.5rem;">High-quality text exhausted (~15T tokens used). Synthetic data quality?</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Compute</strong></td><td style="padding:0.5rem;">$100B clusters planned, new chips (B200, TPU v6, custom), algorithmic efficiency (FlashAttention, MoE, quantization)</td><td style="padding:0.5rem;">Power (GW-scale), cost ($100B+), chip supply, diminishing returns</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Algorithms</strong></td><td style="padding:0.5rem;">Better architectures (Mamba, RWKV, retention), better optimizers (Muon, Sophia), curriculum learning</td><td style="padding:0.5rem;">Transformer may be near local optimum. Paradigm shift needed?</td></tr>
            <tr style="border-bottom:1px solid var(--border);"><td style="padding:0.5rem;"><strong>Objectives</strong></td><td style="padding:0.5rem;">Next-token is weak signal. Process supervision, RL, self-play, planning</td><td style="padding:0.5rem;">RL at scale unsolved. Credit assignment over long horizons.</td></tr>
            <tr><td style="padding:0.5rem;"><strong>Physics</strong></td><td style="padding:0.5rem;">Landauer limit far off. Optical/neuromorphic computing.</td><td style="padding:0.5rem;">Heat death of datacenters. Energy proportional to irreversible ops.</td></tr>
          </tbody>
        </table>

        <h4>New Scaling Paradigms (Post-Chinchilla)</h4>
        <ol>
          <li><strong>Inference-Time Scaling</strong> — o1, Q*: Search, verification, chain-of-thought at test time. Performance ∝ test compute.</li>
          <li><strong>Mixture of Experts (MoE)</strong> — Sparse activation. 1.6T params, 100B active (GPT-4 rumored, Mixtral, DeepSeek-V2). Better param/compute trade-off.</li>
          <li><strong>Data Quality > Quantity</strong> — Phi-3 (3.8B, textbook-quality data) ≈ Llama-3 8B. Curation beats raw scale.</li>
          <li><strong>Test-Time Training</strong> — Adapt weights during inference (TTT, Fast Weights).</li>
        </ol>

        <h4>Bottom Line</h4>
        <p><strong>Pre-training scaling likely continues 2–3 more generations</strong> (GPT-5, 6, 7 class) via data/video/synthetic + MoE + algorithmic gains. But <strong>the frontier is shifting to inference-time compute and reasoning</strong> — the next paradigm isn't just "bigger," it's "thinks longer."</p>
      `,
      tags: ['Future', 'Research', 'Advanced']
    },
  ];

  // ===== STATE =====
  let filteredData = [...faqData];
  let currentCategory = 'all';
  let searchQuery = '';

  // ===== DOM ELEMENTS =====
  const searchInput = document.querySelector('.faq-search-input');
  const categoryTabs = document.querySelectorAll('.faq-tab');
  const faqList = document.querySelector('.faq-list');
  const emptyState = document.querySelector('.faq-empty');

  // ===== INIT =====
  function init() {
    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    const qParam = params.get('q');

    if (catParam) {
      currentCategory = catParam;
      categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.category === catParam));
    }
    if (qParam) {
      searchQuery = qParam;
      if (searchInput) searchInput.value = qParam;
    }

    render();
    setupEventListeners();

    // Scroll to question if hash
    if (qParam) {
      setTimeout(() => {
        const target = document.getElementById(`faq-${qParam}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // ===== EVENT LISTENERS =====
  function setupEventListeners() {
    // Search
    if (searchInput) {
      searchInput.addEventListener('input', debounce(e => {
        searchQuery = e.target.value.toLowerCase().trim();
        render();
      }, 150));
    }

    // Category tabs
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        // Update URL without reload
        const url = new URL(window.location);
        if (currentCategory === 'all') url.searchParams.delete('category');
        else url.searchParams.set('category', currentCategory);
        window.history.replaceState({}, '', url);
        render();
      });
    });

    // Accordion delegation
    faqList?.addEventListener('click', e => {
      const question = e.target.closest('.faq-question');
      if (!question) return;
      const item = question.closest('.faq-item');
      if (!item) return;

      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle
      if (!isOpen) item.classList.add('open');
    });

    // Keyboard support
    faqList?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const question = e.target.closest('.faq-question');
        if (question) {
          e.preventDefault();
          question.click();
        }
      }
    });
  }

  // ===== FILTER & RENDER =====
  function filterData() {
    filteredData = faqData.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
      const matchesSearch = !searchQuery ||
        item.question.toLowerCase().includes(searchQuery) ||
        item.answer.toLowerCase().includes(searchQuery) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
  }

  function render() {
    filterData();

    if (!faqList) return;

    if (filteredData.length === 0) {
      faqList.innerHTML = '';
      emptyState?.classList.add('visible');
      return;
    }

    emptyState?.classList.remove('visible');

    faqList.innerHTML = filteredData.map((item, i) => `
      <article class="faq-item reveal${item.category === 'fundamentals' ? ' reveal-delay-1' : ''}${item.category === 'generative' ? ' reveal-delay-2' : ''}" data-category="${item.category}" id="faq-${item.id}">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${item.id}">
          <span>${escapeHtml(item.question)}</span>
          <svg class="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="faq-answer" id="faq-answer-${item.id}" role="region" aria-hidden="true">
          <div class="faq-answer-content">
            ${item.answer}
            ${item.tags.length ? `
              <div class="tags" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border);">
                ${item.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </article>
    `).join('');

    // Re-observe for scroll reveal
    if (window.initScrollReveal) window.initScrollReveal();
  }

  // ===== UTILITIES =====
  function escapeHtml(str) {
    return str.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '&#039;');
  }

  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  // ===== PUBLIC API =====
  window.faqApp = {
    search: (q) => { searchQuery = q.toLowerCase(); if (searchInput) searchInput.value = q; render(); },
    filterCategory: (cat) => { currentCategory = cat; categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.category === cat)); render(); }
  };

  // ===== START =====
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();