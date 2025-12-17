import { Injectable } from "@angular/core";
import { supabase } from "src/backend/infrastructure/supabase/superbase-client";

@Injectable({
    providedIn: 'root'
})
export class FilesService {
    async uploadFilesToStorage(files: File[]) : Promise<string[]>{
        const fileUrls = [];

        for(const file of files) {
            const filePath = `public/item_${Date.now()}_${file.name}`;
            const { error } = await supabase.storage
                .from('clothes_files')
                .upload(filePath, file);

            if(error) console.error('Error at uploading file: ', file.name, '. Error: ', error);

            const { data } = supabase.storage
                .from('clothes_files')
                .getPublicUrl(filePath);

            fileUrls.push(data.publicUrl);
        }

        return fileUrls;
    }
}