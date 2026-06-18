<?php

namespace App\Actions;

use App\Models\Tenant;
use Illuminate\Support\Facades\DB;

class AutoMapSchema
{
    public function map(Tenant $tenant): array
    {
        $tenant->configureSecondaryConnection();

        $clientTables = $this->getClientTables();
        $canonical = config('sync.tables');
        $suggestions = [];

        foreach ($canonical as $tableName => $definition) {
            if (!$definition['required']) {
                continue;
            }

            $bestMatch = $this->findBestTableMatch($tableName, $clientTables, $definition['label']);
            if ($bestMatch) {
                $columns = $this->getClientColumns($bestMatch);
                $columnMap = $this->suggestColumnMapping($columns, $definition['columns']);
                $suggestions['tables'][$tableName] = [
                    'real_name' => $bestMatch,
                    'columns' => $columnMap,
                ];
            }
        }

        return $suggestions;
    }

    private function getClientTables(): array
    {
        $database = config('database.connections.mysql_secondary.database');
        $tables = DB::connection('mysql_secondary')
            ->select('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?', [$database]);

        return collect($tables)->pluck('TABLE_NAME')->toArray();
    }

    private function getClientColumns(string $table): array
    {
        $database = config('database.connections.mysql_secondary.database');
        return DB::connection('mysql_secondary')
            ->select('SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?', [$database, $table]);
    }

    private function findBestTableMatch(string $canonicalName, array $clientTables, string $label): ?string
    {
        $keywords = array_merge(
            explode('_', $canonicalName),
            array_map('trim', explode(' ', $label))
        );

        $scores = [];
        foreach ($clientTables as $table) {
            $lower = strtolower($table);
            $score = 0;
            foreach ($keywords as $kw) {
                $kw = strtolower(trim($kw));
                if (!$kw) {
                    continue;
                }
                if (str_contains($lower, $kw)) {
                    $score += 10;
                }
                similar_text($kw, $lower, $percent);
                $score += $percent / 10;
            }
            if ($score > 0) {
                $scores[$table] = $score;
            }
        }

        arsort($scores);
        return array_key_first($scores);
    }

    private function suggestColumnMapping(array $clientColumns, array $requiredColumns): array
    {
        $map = [];
        $colNames = collect($clientColumns)->pluck('COLUMN_NAME')->toArray();

        foreach ($requiredColumns as $canonicalCol => $definition) {
            if (!$definition['required']) {
                continue;
            }

            $best = $this->findBestColumnMatch($canonicalCol, $colNames);
            if ($best) {
                $map[$canonicalCol] = $best;
            }
        }

        return $map;
    }

    private function findBestColumnMatch(string $canonical, array $clientCols): ?string
    {
        $keywords = explode('_', strtolower($canonical));
        $scores = [];

        foreach ($clientCols as $col) {
            $lower = strtolower($col);
            $score = 0;
            foreach ($keywords as $kw) {
                if (str_contains($lower, $kw)) {
                    $score += 10;
                }
                if ($lower === $kw) {
                    $score += 20;
                }
                similar_text($kw, $lower, $percent);
                $score += $percent / 10;
            }
            if ($score > 0) {
                $scores[$col] = $score;
            }
        }

        arsort($scores);
        return array_key_first($scores);
    }
}
