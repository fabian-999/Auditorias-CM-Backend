import { supabase } from '../config/supabase.js';
import type { Audit, CreateAuditDto, UpdateAuditDto } from '../models/audit.model.js';

export class AuditsRepository {

    async findAll(): Promise<Audit[]> {

      const { data, error } = await supabase
      .from('audits')
      .select('*')
      .order('created_at', { ascending: false });
  
  
  if (error) {
      throw error;
  }
  
  return data as Audit[];
    }

    async findById(id: string): Promise<Audit | null> {

        const { data, error } = await supabase
            .from('audits')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data as Audit | null;
    }

    async create(payload: CreateAuditDto): Promise<Audit> {

        const { data, error } = await supabase
            .from('audits')
            .insert(payload)
            .select('*')
            .single();

        if (error) {
            throw error;
        }

        return data as Audit;
    }

    async update(id: string, payload: UpdateAuditDto): Promise<Audit> {

        const { data, error } = await supabase
            .from('audits')
            .update(payload)
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            throw error;
        }

        return data as Audit;
    }

    async delete(id: string): Promise<void> {

        const { error } = await supabase
            .from('audits')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }
    }

}
