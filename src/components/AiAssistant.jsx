import React, { useState, useEffect } from 'react';
import { icons } from './icons.js';
import { mockData } from './mockData.js';

// Componente do Assistente IA com integração Gemini
const AiAssistant = ({ selectedCorpus }) => {
    const [insights, setInsights] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateInsights = async () => {
        setIsLoading(true);
        setError('');
        setInsights('');

        const corpusWords = mockData[selectedCorpus]?.words.map(w => w.text).join(', ');
        if (!corpusWords) {
            setError("Selecione um corpus válido primeiro.");
            setIsLoading(false);
            return;
        }

        const prompt = `Baseado nas seguintes palavras-chave de um corpus textual (${mockData[selectedCorpus].name}): ${corpusWords}. Gere um resumo conciso (2-3 frases) dos temas principais e sugira 3 perguntas de pesquisa interessantes que poderiam ser exploradas a partir destes dados. Formate a resposta com "### Resumo" e "### Perguntas de Pesquisa".`;

        try {
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setInsights(text);
            } else {
                throw new Error("A resposta da API não continha o conteúdo esperado.");
            }
        } catch (err) {
            console.error("Erro ao chamar a API Gemini:", err);
            setError("Não foi possível gerar os insights. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    // Reseta os insights quando o corpus muda
    useEffect(() => {
        setInsights('');
        setError('');
    }, [selectedCorpus]);

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-cyan-500/30 flex flex-col h-full">
            <h2 className="text-lg font-semibold text-gray-100 mb-3 flex items-center space-x-2">
                <icons.bot className="w-5 h-5 text-cyan-400" />
                <span>Assistente IA</span>
            </h2>
            <div className="flex-grow text-sm text-gray-400 mb-3 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                        <p className="ml-3">Gerando insights...</p>
                    </div>
                ) : error ? (
                    <p className="text-red-400">{error}</p>
                ) : insights ? (
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: insights.replace(/### (.*?)\n/g, '<h4 class="font-bold text-cyan-300 mt-2 mb-1">$1</h4>').replace(/\* /g, '<br/>- ') }} />
                ) : (
                    <p>Clique no botão abaixo para gerar um resumo analítico e sugestões de pesquisa sobre o corpus selecionado.</p>
                )}
            </div>
            <button
                onClick={handleGenerateInsights}
                disabled={isLoading}
                className="w-full mt-auto p-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-colors flex items-center justify-center"
            >
                ✨ Gerar Insights do Corpus
            </button>
        </div>
    );
};

export default AiAssistant;
