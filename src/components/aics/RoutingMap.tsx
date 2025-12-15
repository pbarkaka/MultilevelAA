import React from 'react';
import type { RoutingNode, RoutingEdge } from '../../data/sampleData';
import './RoutingMap.css';

interface RoutingMapProps {
    nodes: RoutingNode[];
    edges: RoutingEdge[];
    onNodeClick: (nodeId: string) => void;
}

const RoutingMap: React.FC<RoutingMapProps> = ({ nodes, edges, onNodeClick }) => {
    const getNodeColor = (type: string) => {
        switch (type) {
            case 'queue': return '#0d74d1';
            case 'auto-attendant': return '#8b4eda';
            case 'agent': return '#07c1a2';
            case 'voicemail': return '#f7b731';
            default: return '#5a5a5a';
        }
    };

    const getNodeIcon = (type: string) => {
        switch (type) {
            case 'queue': return '⚡';
            case 'auto-attendant': return '🤖';
            case 'agent': return '👤';
            case 'voicemail': return '📧';
            default: return '●';
        }
    };

    return (
        <div className="routing-map">
            <svg width="100%" height="100%" viewBox="0 0 700 400">
                {/* Render edges first (below nodes) */}
                {edges.map(edge => {
                    const fromNode = nodes.find(n => n.id === edge.from);
                    const toNode = nodes.find(n => n.id === edge.to);
                    
                    if (!fromNode || !toNode) return null;
                    
                    return (
                        <g key={edge.id}>
                            <line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke="#e4e4e4"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                            {edge.label && (
                                <text
                                    x={(fromNode.x + toNode.x) / 2}
                                    y={(fromNode.y + toNode.y) / 2 - 10}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fill="#5a5a5a"
                                >
                                    {edge.label}
                                </text>
                            )}
                        </g>
                    );
                })}
                
                {/* Define arrowhead marker */}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="3"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3, 0 6" fill="#e4e4e4" />
                    </marker>
                </defs>
                
                {/* Render nodes */}
                {nodes.map(node => (
                    <g
                        key={node.id}
                        onClick={() => onNodeClick(node.id)}
                        className="routing-node"
                        style={{ cursor: 'pointer' }}
                    >
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="40"
                            fill={getNodeColor(node.type)}
                            stroke="#ffffff"
                            strokeWidth="3"
                        />
                        <text
                            x={node.x}
                            y={node.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="24"
                        >
                            {getNodeIcon(node.type)}
                        </text>
                        <text
                            x={node.x}
                            y={node.y + 55}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="500"
                            fill="#1d1d1d"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default RoutingMap;

