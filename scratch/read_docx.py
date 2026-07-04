import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text_from_docx(docx_path, output_txt_path):
    namespaces = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    
    if not os.path.exists(docx_path):
        print(f"File not found: {docx_path}")
        return

    with zipfile.ZipFile(docx_path) as docx:
        tree = ET.parse(docx.open('word/document.xml'))
        root = tree.getroot()
        
        texts = []
        for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            p_text = []
            for run in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                if run.text:
                    p_text.append(run.text)
            if p_text:
                texts.append("".join(p_text))
                
        with open(output_txt_path, 'w', encoding='utf-8') as f:
            f.write("\n".join(texts))
        print(f"Successfully extracted {len(texts)} paragraphs to {output_txt_path}")

if __name__ == "__main__":
    docx_path = r"C:\Users\ADMIN\Desktop\New folder\Cuban.docx"
    output_txt = r"C:\Users\ADMIN\.gemini\antigravity\scratch\luchao_app\scratch\cuban_extracted.txt"
    extract_text_from_docx(docx_path, output_txt)
