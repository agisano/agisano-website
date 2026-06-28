"""
Builds agisano-invoice-template.odt — Dolibarr-compatible invoice template.
Run: python3 build_invoice_odt.py
"""

from odf.opendocument import OpenDocumentText
from odf.style import (
    Style, TextProperties, ParagraphProperties, TableProperties,
    TableColumnProperties, TableRowProperties, TableCellProperties,
    PageLayout, MasterPage, PageLayoutProperties, GraphicProperties,
)
from odf.text import P, H, Span, LineBreak
from odf.table import Table, TableColumn, TableRow, TableCell
from odf.draw import Frame, TextBox
from odf import teletype
from odf.element import Element
from odf.namespaces import STYLENS, FONS, TABLENS, DRAWNS, SVGNS, TEXTNS
import odf.office

# ── Colours ──────────────────────────────────────────────────────────────────
INK      = "#07090C"
ORANGE   = "#E85D1B"
CREAM    = "#F2EDE6"
CREAM2   = "#EDE7DF"
MUTED    = "#888880"
WHITE    = "#FFFFFF"
DARK_FG  = "#C8C2BB"   # muted cream text on dark bg
FOOTER_BG= "#040609"

doc = OpenDocumentText()
s   = doc.styles

# ── Page layout (A4, narrow margins) ─────────────────────────────────────────
pl = PageLayout(name="A4Layout")
pl.addElement(PageLayoutProperties(
    pagewidth="21cm", pageheight="29.7cm",
    marginleft="1.6cm", marginright="1.6cm",
    margintop="0cm", marginbottom="0cm",
    printorientation="portrait",
))
doc.automaticstyles.addElement(pl)
mp = MasterPage(name="Standard", pagelayoutname="A4Layout")
doc.masterstyles.addElement(mp)

# ── Helper: make a named style ───────────────────────────────────────────────
def para_style(name, fontname="Inter", fontsize="10pt", bold=False,
               color="#07090C", bgcolor=None, align="left",
               margintop="0cm", marginbottom="0cm",
               paddingtop="0cm", paddingbottom="0cm",
               paddingleft="0cm", paddingright="0cm",
               border=None):
    st = Style(name=name, family="paragraph")
    pp_attrs = dict(textalign=align)
    if bgcolor:
        pp_attrs["backgroundcolor"] = bgcolor
    if margintop != "0cm":
        pp_attrs["margintop"] = margintop
    if marginbottom != "0cm":
        pp_attrs["marginbottom"] = marginbottom
    if paddingtop != "0cm":
        pp_attrs["paddingtop"] = paddingtop
    if paddingbottom != "0cm":
        pp_attrs["paddingbottom"] = paddingbottom
    if paddingleft != "0cm":
        pp_attrs["paddingleft"] = paddingleft
    if paddingright != "0cm":
        pp_attrs["paddingright"] = paddingright
    if border:
        pp_attrs["border"] = border
    st.addElement(ParagraphProperties(**pp_attrs))
    tp_attrs = dict(fontname=fontname, fontsize=fontsize, color=color)
    if bold:
        tp_attrs["fontweight"] = "bold"
    if bgcolor:
        tp_attrs["backgroundcolor"] = bgcolor
    st.addElement(TextProperties(**tp_attrs))
    s.addElement(st)
    return name

def span_style(name, fontname="Inter", fontsize="10pt", bold=False,
               color="#07090C", bgcolor=None, italic=False):
    st = Style(name=name, family="text")
    tp = dict(fontname=fontname, fontsize=fontsize, color=color)
    if bold:   tp["fontweight"] = "bold"
    if italic: tp["fontstyle"] = "italic"
    if bgcolor: tp["backgroundcolor"] = bgcolor
    st.addElement(TextProperties(**tp))
    s.addElement(st)
    return name

def cell_style(name, bgcolor=WHITE, valign="top",
               padtop="0.15cm", padbottom="0.15cm",
               padleft="0.2cm", padright="0.2cm",
               border_bottom=None, border_top=None):
    st = Style(name=name, family="table-cell")
    attrs = dict(
        backgroundcolor=bgcolor,
        verticalalign=valign,
        paddingtop=padtop, paddingbottom=padbottom,
        paddingleft=padleft, paddingright=padright,
    )
    if border_bottom:
        attrs["borderbottom"] = border_bottom
    if border_top:
        attrs["bordertop"] = border_top
    st.addElement(TableCellProperties(**attrs))
    s.addElement(st)
    return name

def row_style(name, height=None):
    st = Style(name=name, family="table-row")
    rp = TableRowProperties()
    if height:
        rp.setAttribute("rowheight", height)
        rp.setAttribute("useoptimalrowheight", "false")
    st.addElement(rp)
    s.addElement(st)
    return name

def col_style(name, width):
    st = Style(name=name, family="table-column")
    st.addElement(TableColumnProperties(columnwidth=width))
    s.addElement(st)
    return name

def tbl_style(name):
    st = Style(name=name, family="table")
    st.addElement(TableProperties(width="17.8cm", align="left"))
    s.addElement(st)
    return name

# ── Define styles ─────────────────────────────────────────────────────────────

# Para styles
para_style("DarkBg",    bgcolor=INK)
para_style("CreamBg",   bgcolor=CREAM)
para_style("FooterBg",  bgcolor=FOOTER_BG)
para_style("WhiteBg",   bgcolor=WHITE)
para_style("Cream2Bg",  bgcolor=CREAM2)

# Text styles — dark background
span_style("S_InvLabel",  "Sora", "7pt",  bold=True,  color="rgba(242,237,230,0.3)")   # fallback: muted
span_style("S_InvNum",    "Sora", "22pt", bold=True,  color=CREAM)
span_style("S_Wordmark",  "Sora", "14pt", bold=True,  color=CREAM)
span_style("S_MetaLabel", "Sora", "7pt",  bold=True,  color="#666055")
span_style("S_MetaVal",   "Inter","10pt", bold=False, color="#A09888")
span_style("S_MetaStrong","Inter","10pt", bold=True,  color=CREAM)
span_style("S_OrangeVal", "Inter","10pt", bold=True,  color=ORANGE)

# Text styles — light background
span_style("S_BillName",  "Sora", "13pt", bold=True,  color=INK)
span_style("S_BillLabel", "Sora", "7pt",  bold=True,  color="#999088")
span_style("S_BillDetail","Inter","9pt",  bold=False, color="#666055")
span_style("S_StatusPill","Sora", "8pt",  bold=True,  color=WHITE,    bgcolor=INK)

# Table header
span_style("S_TH",        "Sora", "7pt",  bold=True,  color="#888880")

# Line items
span_style("S_ItemName",  "Inter","10pt", bold=True,  color=INK)
span_style("S_ItemDesc",  "Inter","8.5pt",bold=False, color=MUTED,    italic=True)
span_style("S_ItemNum",   "Sora", "7pt",  bold=True,  color="#CCCCCC")
span_style("S_Cell",      "Inter","10pt", bold=False, color="#555550")
span_style("S_CellAmt",   "Inter","10pt", bold=True,  color=INK)

# Totals
span_style("S_TotalLabel","Inter","10pt", bold=False, color=MUTED)
span_style("S_TotalVal",  "Inter","10pt", bold=True,  color=INK)
span_style("S_GrandLabel","Sora", "12pt", bold=True,  color=INK)
span_style("S_GrandVal",  "Sora", "17pt", bold=True,  color=ORANGE)

# Notes / footer
span_style("S_NoteLabel", "Sora", "7pt",  bold=True,  color="#555044")
span_style("S_NoteVal",   "Inter","9pt",  bold=False, color="#9A9488")
span_style("S_NoteStrong","Inter","9pt",  bold=True,  color=DARK_FG)
span_style("S_FooterTxt", "Inter","8pt",  bold=False, color="#444040")
span_style("S_FooterRight","Sora","7pt",  bold=True,  color="#333030")

# Cell styles
cell_style("C_Dark",     bgcolor=INK,     padtop="0.3cm", padbottom="0.3cm", padleft="0.5cm", padright="0.3cm")
cell_style("C_DarkR",    bgcolor=INK,     padtop="0.3cm", padbottom="0.3cm", padleft="0.3cm", padright="0.5cm")
cell_style("C_Cream",    bgcolor=CREAM,   padtop="0.25cm",padbottom="0.25cm",padleft="0.5cm", padright="0.3cm")
cell_style("C_CreamR",   bgcolor=CREAM,   padtop="0.25cm",padbottom="0.25cm",padleft="0.3cm", padright="0.5cm")
cell_style("C_White",    bgcolor=WHITE,   padtop="0.22cm",padbottom="0.22cm",padleft="0.5cm", padright="0.3cm",
           border_bottom="0.03cm solid #EBEBEB")
cell_style("C_WhiteR",   bgcolor=WHITE,   padtop="0.22cm",padbottom="0.22cm",padleft="0.3cm", padright="0.5cm",
           border_bottom="0.03cm solid #EBEBEB")
cell_style("C_TH",       bgcolor=WHITE,   padtop="0.18cm",padbottom="0.14cm",padleft="0.5cm", padright="0.3cm",
           border_bottom="0.05cm solid #07090C")
cell_style("C_THR",      bgcolor=WHITE,   padtop="0.18cm",padbottom="0.14cm",padleft="0.3cm", padright="0.5cm",
           border_bottom="0.05cm solid #07090C")
cell_style("C_TotalCell",bgcolor=WHITE,   padtop="0.1cm", padbottom="0.1cm", padleft="0.3cm", padright="0.5cm")
cell_style("C_GrandCell",bgcolor=WHITE,   padtop="0.18cm",padbottom="0.18cm",padleft="0.3cm", padright="0.5cm",
           border_top="0.03cm solid #DDDDDD")
cell_style("C_Cream2",   bgcolor=CREAM2,  padtop="0.3cm", padbottom="0.3cm", padleft="0.5cm", padright="0.3cm")
cell_style("C_Cream2R",  bgcolor=CREAM2,  padtop="0.3cm", padbottom="0.3cm", padleft="0.3cm", padright="0.5cm")
cell_style("C_Footer",   bgcolor=FOOTER_BG,padtop="0.2cm",padbottom="0.2cm",padleft="0.5cm", padright="0.3cm")
cell_style("C_FooterR",  bgcolor=FOOTER_BG,padtop="0.2cm",padbottom="0.2cm",padleft="0.3cm", padright="0.5cm")
cell_style("C_Spacer",   bgcolor=WHITE,   padtop="0cm",   padbottom="0cm",   padleft="0cm",   padright="0cm")

# Col styles
col_style("Col_Stretch", "9.2cm")
col_style("Col_Qty",     "1.8cm")
col_style("Col_Unit",    "3.2cm")
col_style("Col_Amt",     "3.6cm")

col_style("Col_Half",    "8.9cm")
col_style("Col_TotLabel","11.0cm")
col_style("Col_TotVal",  "6.8cm")

# Table styles
tbl_style("Tbl_Main")

# ── Helper functions ──────────────────────────────────────────────────────────

def p(text="", style="DarkBg", spans=None):
    """Paragraph with optional list of (text, spanstyle) tuples."""
    para = P(stylename=style)
    if spans:
        for t, sp in spans:
            if t == "\n":
                para.addElement(LineBreak())
            elif sp:
                s_ = Span(stylename=sp, text=t)
                para.addElement(s_)
            else:
                teletype.addTextToElement(para, t)
    elif text:
        teletype.addTextToElement(para, text)
    return para

def cell(content_paras, stylename="C_Dark", colspan=1):
    tc = TableCell(stylename=stylename)
    if colspan > 1:
        tc.setAttribute("numbercolumnsspanned", str(colspan))
    for cp in content_paras:
        tc.addElement(cp)
    return tc

def covered():
    from odf.table import CoveredTableCell
    return CoveredTableCell()

def row(*cells, stylename=None):
    tr = TableRow(stylename=stylename) if stylename else TableRow()
    for c in cells:
        tr.addElement(c)
    return tr

def spacer_row(height="0.35cm", colspan=4):
    rs = row_style(f"RS_Spacer_{height.replace('.','')}", height=height)
    cell_style(f"C_Sp_{height.replace('.','')}", bgcolor=WHITE,
               padtop="0cm", padbottom="0cm", padleft="0cm", padright="0cm")
    cs = f"C_Sp_{height.replace('.','')}"
    sc = TableCell(stylename=cs)
    sc.setAttribute("numbercolumnsspanned", str(colspan))
    sc.addElement(P(stylename="WhiteBg"))
    tr = TableRow(stylename=rs)
    tr.addElement(sc)
    for _ in range(colspan - 1):
        from odf.table import CoveredTableCell
        tr.addElement(CoveredTableCell())
    return tr

# ── Build document ────────────────────────────────────────────────────────────
body = doc.text

def add_table(tbl):
    body.addElement(tbl)

# ═══════════════════════════════════════════════════════════
# SECTION 1 — HEADER (dark background)
# ═══════════════════════════════════════════════════════════
t = Table(name="Header", stylename="Tbl_Main")
t.addElement(TableColumn(stylename="Col_Stretch"))
t.addElement(TableColumn(stylename="Col_Qty"))
t.addElement(TableColumn(stylename="Col_Unit"))
t.addElement(TableColumn(stylename="Col_Amt"))

# Row 1: Logo left | Invoice label+number right (spans 3 cols)
t.addElement(row(
    cell([
        p(spans=[("A  ", "S_Wordmark"), ("Agisano", "S_Wordmark")]),
    ], "C_Dark"),
    cell([
        p(spans=[("INVOICE", "S_MetaLabel")], style="DarkBg"),
        p(spans=[("{ref}", "S_InvNum")], style="DarkBg"),
    ], "C_DarkR", colspan=3),
    covered(), covered(),
    stylename=row_style("R_Logo", "1.4cm"),
))

# Divider row (thin dark spacer)
cell_style("C_DarkDiv", bgcolor=INK, padtop="0cm", padbottom="0cm",
           padleft="0cm", padright="0cm",
           border_bottom="0.02cm solid #222222")
t.addElement(row(
    cell([P(stylename="DarkBg")], "C_DarkDiv", colspan=4),
    covered(), covered(), covered(),
    stylename=row_style("R_Div1", "0.05cm"),
))

# Row 2: FROM | DATES | VAT REF  (meta grid)
t.addElement(row(
    cell([
        p(spans=[("FROM", "S_MetaLabel")], style="DarkBg"),
        p(spans=[("Agisano (Pty) Ltd", "S_MetaStrong")], style="DarkBg"),
        p(spans=[("hello@agisano.com", "S_MetaVal")], style="DarkBg"),
        p(spans=[("agisano.com", "S_MetaVal")], style="DarkBg"),
        p(spans=[("Gauteng, South Africa", "S_MetaVal")], style="DarkBg"),
    ], "C_Dark"),
    cell([
        p(spans=[("ISSUE DATE", "S_MetaLabel")], style="DarkBg"),
        p(spans=[("{date}", "S_MetaStrong")], style="DarkBg"),
        p("", style="DarkBg"),
        p(spans=[("DUE DATE", "S_MetaLabel")], style="DarkBg"),
        p(spans=[("{date_lim}", "S_OrangeVal")], style="DarkBg"),
    ], "C_Dark", colspan=2),
    covered(),
    cell([
        p(spans=[("VAT / REG", "S_MetaLabel")], style="DarkBg"),
        p(spans=[("VAT: {your_vat_no}", "S_MetaStrong")], style="DarkBg"),
        p(spans=[("Reg: {your_reg_no}", "S_MetaVal")], style="DarkBg"),
    ], "C_DarkR"),
    stylename=row_style("R_Meta", "1.8cm"),
))

add_table(t)

# ═══════════════════════════════════════════════════════════
# SECTION 2 — BILL TO (cream background)
# ═══════════════════════════════════════════════════════════
t2 = Table(name="BillTo", stylename="Tbl_Main")
t2.addElement(TableColumn(stylename="Col_Stretch"))
t2.addElement(TableColumn(stylename="Col_Qty"))
t2.addElement(TableColumn(stylename="Col_Unit"))
t2.addElement(TableColumn(stylename="Col_Amt"))

t2.addElement(row(
    cell([
        p(spans=[("BILLED TO", "S_BillLabel")], style="CreamBg"),
        p(spans=[("{customer_name}", "S_BillName")], style="CreamBg"),
        p(spans=[("Attn: {customer_firstname} {customer_lastname}", "S_BillDetail")], style="CreamBg"),
        p(spans=[("{customer_address}", "S_BillDetail")], style="CreamBg"),
    ], "C_Cream", colspan=3),
    covered(), covered(),
    cell([
        p(spans=[("{status}", "S_StatusPill")], style="CreamBg"),
    ], "C_CreamR"),
    stylename=row_style("R_BillTo", "1.4cm"),
))

add_table(t2)

# ═══════════════════════════════════════════════════════════
# SECTION 3 — LINE ITEMS (white background)
# ═══════════════════════════════════════════════════════════
t3 = Table(name="LineItems", stylename="Tbl_Main")
t3.addElement(TableColumn(stylename="Col_Stretch"))
t3.addElement(TableColumn(stylename="Col_Qty"))
t3.addElement(TableColumn(stylename="Col_Unit"))
t3.addElement(TableColumn(stylename="Col_Amt"))

# Table header row
t3.addElement(row(
    cell([p(spans=[("DESCRIPTION", "S_TH")], style="WhiteBg")], "C_TH"),
    cell([p(spans=[("QTY", "S_TH")], style="WhiteBg")], "C_TH"),
    cell([p(spans=[("UNIT PRICE", "S_TH")], style="WhiteBg")], "C_TH"),
    cell([p(spans=[("AMOUNT", "S_TH")], style="WhiteBg")], "C_THR"),
    stylename=row_style("R_TH", "0.65cm"),
))

# ── Line item rows (Dolibarr loop tags) ──
# Dolibarr replaces everything between {forlines} ... {/forlines}
# Each tag below is a standard Dolibarr ODT variable

for i in range(4):
    cs = f"C_WL{i}"
    cell_style(cs, bgcolor=WHITE, padtop="0.18cm", padbottom="0.18cm",
               padleft="0.5cm", padright="0.3cm",
               border_bottom="0.02cm solid #EFEFEF")
    csr = f"C_WLR{i}"
    cell_style(csr, bgcolor=WHITE, padtop="0.18cm", padbottom="0.18cm",
               padleft="0.3cm", padright="0.5cm",
               border_bottom="0.02cm solid #EFEFEF")

    if i == 0:
        desc_paras = [
            p(spans=[("{forlines}{desc}", "S_ItemName")], style="WhiteBg"),
            p(spans=[("{label_optional}", "S_ItemDesc")], style="WhiteBg"),
        ]
        qty_p  = [p(spans=[("{qty}", "S_Cell")],   style="WhiteBg")]
        up_p   = [p(spans=[("{up}", "S_Cell")],     style="WhiteBg")]
        amt_p  = [p(spans=[("{total_ht}{/forlines}", "S_CellAmt")], style="WhiteBg")]
    else:
        # placeholder rows so the table has visible structure in LibreOffice
        desc_paras = [p("", style="WhiteBg")]
        qty_p  = [p("", style="WhiteBg")]
        up_p   = [p("", style="WhiteBg")]
        amt_p  = [p("", style="WhiteBg")]

    t3.addElement(row(
        cell(desc_paras, cs),
        cell(qty_p,      cs),
        cell(up_p,       cs),
        cell(amt_p,      csr),
        stylename=row_style(f"R_Line{i}", "1.1cm"),
    ))

add_table(t3)

# ═══════════════════════════════════════════════════════════
# SECTION 4 — TOTALS
# ═══════════════════════════════════════════════════════════
t4 = Table(name="Totals", stylename="Tbl_Main")
t4.addElement(TableColumn(stylename="Col_TotLabel"))
t4.addElement(TableColumn(stylename="Col_TotVal"))

for label, val, is_grand in [
    ("Subtotal (excl. VAT)",  "{total_ht}",  False),
    ("VAT (15%)",             "{total_vat}", False),
    ("Total due (incl. VAT)", "{total_ttc}", True),
]:
    lcs = "C_GrandCell" if is_grand else "C_TotalCell"
    rcs = "C_GrandCell" if is_grand else "C_TotalCell"
    ls  = "S_GrandLabel" if is_grand else "S_TotalLabel"
    vs  = "S_GrandVal"   if is_grand else "S_TotalVal"
    rh  = "0.75cm"       if is_grand else "0.55cm"

    t4.addElement(row(
        cell([p(spans=[(label, ls)], style="WhiteBg")], lcs),
        cell([p(spans=[(val,   vs)], style="WhiteBg")], rcs),
        stylename=row_style(f"R_Tot_{label[:6]}", rh),
    ))

add_table(t4)

# ═══════════════════════════════════════════════════════════
# SECTION 5 — NOTES + BANKING (dark cream)
# ═══════════════════════════════════════════════════════════
t5 = Table(name="Notes", stylename="Tbl_Main")
t5.addElement(TableColumn(stylename="Col_Half"))
t5.addElement(TableColumn(stylename="Col_Half"))

t5.addElement(row(
    cell([
        p(spans=[("BANKING DETAILS", "S_NoteLabel")], style="Cream2Bg"),
        p(spans=[("Agisano (Pty) Ltd", "S_NoteStrong")], style="Cream2Bg"),
        p(spans=[("Bank: {your_bank}", "S_NoteVal")], style="Cream2Bg"),
        p(spans=[("Account: {your_account_no}", "S_NoteVal")], style="Cream2Bg"),
        p(spans=[("Branch code: {your_branch_code}", "S_NoteVal")], style="Cream2Bg"),
        p(spans=[("Reference: {ref}", "S_NoteStrong")], style="Cream2Bg"),
    ], "C_Cream2"),
    cell([
        p(spans=[("PAYMENT TERMS & NOTES", "S_NoteLabel")], style="Cream2Bg"),
        p(spans=[("Payment due within 14 days of invoice date.", "S_NoteVal")], style="Cream2Bg"),
        p(spans=[("Use invoice number as payment reference.", "S_NoteVal")], style="Cream2Bg"),
        p("", style="Cream2Bg"),
        p(spans=[("Queries: hello@agisano.com", "S_NoteVal")], style="Cream2Bg"),
        p(spans=[("{notes}", "S_NoteVal")], style="Cream2Bg"),
    ], "C_Cream2R"),
    stylename=row_style("R_Notes", "2.2cm"),
))

add_table(t5)

# ═══════════════════════════════════════════════════════════
# SECTION 6 — FOOTER
# ═══════════════════════════════════════════════════════════
t6 = Table(name="Footer", stylename="Tbl_Main")
t6.addElement(TableColumn(stylename="Col_Stretch"))
t6.addElement(TableColumn(stylename="Col_Qty"))
t6.addElement(TableColumn(stylename="Col_Unit"))
t6.addElement(TableColumn(stylename="Col_Amt"))

t6.addElement(row(
    cell([
        p(spans=[("Agisano (Pty) Ltd  ·  Reg: {your_reg_no}  ·  VAT: {your_vat_no}  ·  Gauteng, South Africa", "S_FooterTxt")],
           style="FooterBg"),
    ], "C_Footer", colspan=3),
    covered(), covered(),
    cell([
        p(spans=[("agisano.com", "S_FooterRight")], style="FooterBg"),
    ], "C_FooterR"),
    stylename=row_style("R_Footer", "0.7cm"),
))

add_table(t6)

# ── Save ──────────────────────────────────────────────────────────────────────
out = "/home/kagiso/agisano/agisano-website/agisano-invoice-template.odt"
doc.save(out)
print(f"Saved: {out}")
