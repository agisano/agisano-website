"""
Builds agisano-letterhead-template.odt
A clean A4 letterhead with Agisano branding.
Run: python3 build_letterhead_odt.py
"""

from odf.opendocument import OpenDocumentText
from odf.style import (
    Style, TextProperties, ParagraphProperties,
    TableProperties, TableColumnProperties, TableRowProperties,
    TableCellProperties, PageLayout, MasterPage, PageLayoutProperties,
    Header, Footer as StyleFooter, HeaderFooterProperties,
)
from odf.text import P, Span, LineBreak
from odf.table import Table, TableColumn, TableRow, TableCell, CoveredTableCell
from odf import teletype

INK       = "#07090C"
ORANGE    = "#E85D1B"
CREAM     = "#F2EDE6"
CREAM2    = "#EDE7DF"
FOOTER_BG = "#040609"
WHITE     = "#FFFFFF"
MUTED     = "#888880"

doc = OpenDocumentText()
s   = doc.styles

# ── Page layout ───────────────────────────────────────────────────────────────
pl = PageLayout(name="A4Layout")
pl.addElement(PageLayoutProperties(
    pagewidth="21cm", pageheight="29.7cm",
    marginleft="0cm", marginright="0cm",
    margintop="0cm",  marginbottom="0cm",
    printorientation="portrait",
))
doc.automaticstyles.addElement(pl)
mp = MasterPage(name="Standard", pagelayoutname="A4Layout")
doc.masterstyles.addElement(mp)

# ── Style helpers ─────────────────────────────────────────────────────────────
def para_style(name, fontname="Inter", fontsize="10pt", bold=False,
               color=INK, bgcolor=None, align="left",
               margintop="0cm", marginbottom="0cm",
               padtop="0cm", padbottom="0cm",
               padleft="0cm", padright="0cm"):
    st = Style(name=name, family="paragraph")
    pp = dict(textalign=align)
    if bgcolor:   pp["backgroundcolor"] = bgcolor
    if margintop != "0cm":  pp["margintop"]  = margintop
    if marginbottom != "0cm": pp["marginbottom"] = marginbottom
    if padtop   != "0cm":   pp["paddingtop"]    = padtop
    if padbottom!= "0cm":   pp["paddingbottom"] = padbottom
    if padleft  != "0cm":   pp["paddingleft"]   = padleft
    if padright != "0cm":   pp["paddingright"]  = padright
    st.addElement(ParagraphProperties(**pp))
    tp = dict(fontname=fontname, fontsize=fontsize, color=color)
    if bold: tp["fontweight"] = "bold"
    if bgcolor: tp["backgroundcolor"] = bgcolor
    st.addElement(TextProperties(**tp))
    s.addElement(st)
    return name

def span_style(name, fontname="Inter", fontsize="10pt", bold=False,
               color=INK, italic=False, underline=False):
    st = Style(name=name, family="text")
    tp = dict(fontname=fontname, fontsize=fontsize, color=color)
    if bold:      tp["fontweight"] = "bold"
    if italic:    tp["fontstyle"]  = "italic"
    if underline: tp["textunderlinestyle"] = "solid"; tp["textunderlinewidth"] = "auto"; tp["textunderlinecolor"] = "font-color"
    st.addElement(TextProperties(**tp))
    s.addElement(st)
    return name

def cell_style(name, bgcolor=WHITE, valign="top",
               padtop="0.2cm", padbottom="0.2cm",
               padleft="0.5cm", padright="0.5cm",
               border_bottom=None, border_top=None, border_right=None):
    st = Style(name=name, family="table-cell")
    attrs = dict(backgroundcolor=bgcolor, verticalalign=valign,
                 paddingtop=padtop, paddingbottom=padbottom,
                 paddingleft=padleft, paddingright=padright)
    if border_bottom: attrs["borderbottom"] = border_bottom
    if border_top:    attrs["bordertop"]    = border_top
    if border_right:  attrs["borderright"]  = border_right
    st.addElement(TableCellProperties(**attrs))
    s.addElement(st)
    return name

def col_style(name, width):
    st = Style(name=name, family="table-column")
    st.addElement(TableColumnProperties(columnwidth=width))
    s.addElement(st)
    return name

def row_style(name, height="auto", exact=False):
    st = Style(name=name, family="table-row")
    rp = TableRowProperties()
    if height != "auto":
        rp.setAttribute("rowheight", height)
        rp.setAttribute("useoptimalrowheight", "false" if exact else "true")
    st.addElement(rp)
    s.addElement(st)
    return name

def tbl_style(name, width="21cm"):
    st = Style(name=name, family="table")
    st.addElement(TableProperties(width=width, align="left"))
    s.addElement(st)
    return name

# ── Define styles ─────────────────────────────────────────────────────────────

# Background para styles
para_style("BG_Ink",    bgcolor=INK)
para_style("BG_Orange", bgcolor=ORANGE)
para_style("BG_Cream",  bgcolor=CREAM)
para_style("BG_Cream2", bgcolor=CREAM2)
para_style("BG_White",  bgcolor=WHITE)
para_style("BG_Footer", bgcolor=FOOTER_BG)

# Body text styles (used in content area)
para_style("Body",       fontname="Inter",  fontsize="10.5pt", color=INK,
           margintop="0cm", marginbottom="0.3cm",
           padleft="1.8cm", padright="1.8cm")
para_style("BodyFirst",  fontname="Inter",  fontsize="10.5pt", color=INK,
           margintop="0.5cm", marginbottom="0.3cm",
           padleft="1.8cm", padright="1.8cm")
para_style("BodyLast",   fontname="Inter",  fontsize="10.5pt", color=INK,
           margintop="0cm", marginbottom="0.6cm",
           padleft="1.8cm", padright="1.8cm")
para_style("Heading1",   fontname="Sora",   fontsize="16pt",   bold=True,
           color=INK, margintop="0.6cm", marginbottom="0.2cm",
           padleft="1.8cm", padright="1.8cm")
para_style("Heading2",   fontname="Sora",   fontsize="12pt",   bold=True,
           color=ORANGE, margintop="0.5cm", marginbottom="0.15cm",
           padleft="1.8cm", padright="1.8cm")
para_style("SubjectLine",fontname="Sora",   fontsize="13pt",   bold=True,
           color=INK, margintop="0.4cm", marginbottom="0.4cm",
           padleft="1.8cm", padright="1.8cm")
para_style("Salutation", fontname="Inter",  fontsize="10.5pt", color=INK,
           margintop="0.3cm", marginbottom="0.3cm",
           padleft="1.8cm", padright="1.8cm")
para_style("Closing",    fontname="Inter",  fontsize="10.5pt", color=INK,
           margintop="0.8cm", marginbottom="0.15cm",
           padleft="1.8cm", padright="1.8cm")
para_style("SignName",   fontname="Sora",   fontsize="11pt",   bold=True,
           color=INK, marginbottom="0.05cm",
           padleft="1.8cm", padright="1.8cm")
para_style("SignRole",   fontname="Inter",  fontsize="9pt",    color=MUTED,
           padleft="1.8cm", padright="1.8cm")
para_style("RefLine",    fontname="Inter",  fontsize="9pt",    color=MUTED,
           marginbottom="0.15cm",
           padleft="1.8cm", padright="1.8cm")

# Span styles
span_style("SP_Label",   "Sora",  "7pt",  bold=True,  color="#666055")
span_style("SP_Strong",  "Inter", "10.5pt",bold=True, color=INK)
span_style("SP_Orange",  "Sora",  "10pt", bold=True,  color=ORANGE)
span_style("SP_Muted",   "Inter", "9pt",  bold=False, color=MUTED)
span_style("SP_White",   "Inter", "9pt",  bold=False, color=CREAM)
span_style("SP_WhiteSm", "Sora",  "7pt",  bold=True,  color="#666055")
span_style("SP_WordmarkDark","Sora","13pt",bold=True,  color=CREAM)
span_style("SP_TaglineDark","Inter","8pt", bold=False, color="rgba(242,237,230,0.35)", italic=True)
span_style("SP_FootTxt", "Inter", "8pt",  bold=False, color="#555050")
span_style("SP_FootRight","Sora", "7pt",  bold=True,  color="#444040")
span_style("SP_OrangeStrip","Sora","7.5pt",bold=True, color="rgba(255,255,255,0.75)")

# Cell styles
cell_style("CS_Ink",      bgcolor=INK,       padtop="0.35cm", padbottom="0.35cm", padleft="0.7cm",  padright="0.4cm")
cell_style("CS_InkR",     bgcolor=INK,       padtop="0.35cm", padbottom="0.35cm", padleft="0.4cm",  padright="0.7cm")
cell_style("CS_InkMid",   bgcolor=INK,       padtop="0.35cm", padbottom="0.35cm", padleft="0.4cm",  padright="0.4cm",
           border_right="0.03cm solid #1e1e1e")
cell_style("CS_Orange",   bgcolor=ORANGE,    padtop="0.18cm", padbottom="0.18cm", padleft="0.7cm",  padright="0.7cm")
cell_style("CS_Cream",    bgcolor=CREAM,     padtop="0.28cm", padbottom="0.28cm", padleft="0.7cm",  padright="0.4cm")
cell_style("CS_CreamR",   bgcolor=CREAM,     padtop="0.28cm", padbottom="0.28cm", padleft="0.4cm",  padright="0.7cm")
cell_style("CS_White",    bgcolor=WHITE,     padtop="0cm",    padbottom="0cm",    padleft="0cm",    padright="0cm")
cell_style("CS_Footer",   bgcolor=FOOTER_BG, padtop="0.22cm", padbottom="0.22cm", padleft="0.7cm",  padright="0.4cm")
cell_style("CS_FooterR",  bgcolor=FOOTER_BG, padtop="0.22cm", padbottom="0.22cm", padleft="0.4cm",  padright="0.7cm")
cell_style("CS_OrangeStrip", bgcolor=ORANGE, padtop="0.12cm", padbottom="0.12cm", padleft="0.7cm",  padright="0.7cm")

# Col styles — full page width 21cm
col_style("Col_Full",    "21cm")
col_style("Col_LogoL",   "10.5cm")
col_style("Col_LogoR",   "10.5cm")
col_style("Col_MetaA",   "5.5cm")
col_style("Col_MetaB",   "5.5cm")
col_style("Col_MetaC",   "10cm")
col_style("Col_AddrL",   "11cm")
col_style("Col_AddrR",   "10cm")

# Table style
tbl_style("Tbl_Full", "21cm")

# ── Helpers ───────────────────────────────────────────────────────────────────
def p(text="", style="BG_White", spans=None):
    para = P(stylename=style)
    if spans:
        for t, sp in spans:
            if t == "\n":
                para.addElement(LineBreak())
            elif sp:
                para.addElement(Span(stylename=sp, text=t))
            else:
                teletype.addTextToElement(para, t)
    elif text:
        teletype.addTextToElement(para, text)
    return para

def tc(paras, cs="CS_Ink", colspan=1):
    c = TableCell(stylename=cs)
    if colspan > 1:
        c.setAttribute("numbercolumnsspanned", str(colspan))
    for para in paras:
        c.addElement(para)
    return c

def cov():
    return CoveredTableCell()

def row(*cells, rs=None):
    tr = TableRow(stylename=rs) if rs else TableRow()
    for c in cells:
        tr.addElement(c)
    return tr

body = doc.text

# ═══════════════════════════════════════════════════════════
# SECTION 1 — TOP HEADER (dark, full width)
# ═══════════════════════════════════════════════════════════
t1 = Table(name="Header", stylename="Tbl_Full")
t1.addElement(TableColumn(stylename="Col_LogoL"))
t1.addElement(TableColumn(stylename="Col_LogoR"))

# Row: Logo left + tagline | Contact right
t1.addElement(row(
    tc([
        p(spans=[("A  ", "SP_Orange"), ("Agisano", "SP_WordmarkDark")], style="BG_Ink"),
        p(spans=[("Building Together", "SP_TaglineDark")], style="BG_Ink"),
    ], "CS_Ink"),
    tc([
        p(spans=[("hello@agisano.com", "SP_White")], style="BG_Ink"),
        p(spans=[("agisano.com  ·  Gauteng, South Africa", "SP_White")], style="BG_Ink"),
    ], "CS_InkR"),
    rs=row_style("RS_Header", "1.5cm"),
))

body.addElement(t1)

# ═══════════════════════════════════════════════════════════
# SECTION 2 — ORANGE ACCENT STRIP
# ═══════════════════════════════════════════════════════════
t2 = Table(name="Strip", stylename="Tbl_Full")
t2.addElement(TableColumn(stylename="Col_Full"))

t2.addElement(row(
    tc([
        p(spans=[("Registered in South Africa  ·  Gauteng  ·  agisano.com", "SP_OrangeStrip")], style="BG_Orange"),
    ], "CS_OrangeStrip"),
    rs=row_style("RS_Strip", "0.42cm", exact=True),
))

body.addElement(t2)

# ═══════════════════════════════════════════════════════════
# SECTION 3 — RECIPIENT + DATE + REF (cream)
# ═══════════════════════════════════════════════════════════
t3 = Table(name="Recipient", stylename="Tbl_Full")
t3.addElement(TableColumn(stylename="Col_AddrL"))
t3.addElement(TableColumn(stylename="Col_AddrR"))

t3.addElement(row(
    tc([
        p(spans=[("TO", "SP_Label")], style="BG_Cream"),
        p(spans=[("[Recipient Name / Organisation]", "SP_Strong")], style="BG_Cream"),
        p(spans=[("[Title / Role]", "SP_Muted")], style="BG_Cream"),
        p(spans=[("[Address Line 1]", "SP_Muted")], style="BG_Cream"),
        p(spans=[("[Address Line 2, Province]", "SP_Muted")], style="BG_Cream"),
    ], "CS_Cream"),
    tc([
        p(spans=[("DATE", "SP_Label")], style="BG_Cream"),
        p(spans=[("[Date]", "SP_Strong")], style="BG_Cream"),
        p("", style="BG_Cream"),
        p(spans=[("REFERENCE", "SP_Label")], style="BG_Cream"),
        p(spans=[("[Ref / Invoice / Doc No.]", "SP_Orange")], style="BG_Cream"),
    ], "CS_CreamR"),
    rs=row_style("RS_Recipient", "2.0cm"),
))

body.addElement(t3)

# ═══════════════════════════════════════════════════════════
# SECTION 4 — BODY CONTENT AREA (white)
# Instructional placeholder text — replace with actual content
# ═══════════════════════════════════════════════════════════

# Subject line
body.addElement(p(spans=[("RE: [Subject / Document Title]", "SP_Strong")], style="SubjectLine"))

# Salutation
body.addElement(p("Dear [Name],", style="Salutation"))

# Body paragraphs — replace with actual content
body.addElement(p(
    "This letter serves as official correspondence from Agisano (Pty) Ltd. "
    "Please replace this paragraph with the body of your letter or document. "
    "Use the paragraph styles defined in this template to maintain consistent formatting.",
    style="BodyFirst",
))
body.addElement(p(
    "Agisano is a Gauteng-based ICT services provider working exclusively with public schools. "
    "We offer connectivity, technology, managed IT services, and digital presence solutions "
    "designed specifically for the realities of South African public education.",
    style="Body",
))
body.addElement(p(
    "Should you have any questions or require further information, please do not hesitate to "
    "contact us at hello@agisano.com or visit agisano.com.",
    style="BodyLast",
))

# Closing
body.addElement(p("Yours sincerely,", style="Closing"))
body.addElement(p("", style="Body"))
body.addElement(p("", style="Body"))
body.addElement(p("", style="Body"))
body.addElement(p("[Your Full Name]", style="SignName"))
body.addElement(p("[Title]  ·  Agisano (Pty) Ltd", style="SignRole"))

# ═══════════════════════════════════════════════════════════
# SECTION 5 — FOOTER (dark, full width)
# ═══════════════════════════════════════════════════════════
t5 = Table(name="DocFooter", stylename="Tbl_Full")
t5.addElement(TableColumn(stylename="Col_AddrL"))
t5.addElement(TableColumn(stylename="Col_AddrR"))

t5.addElement(row(
    tc([
        p(spans=[("Agisano (Pty) Ltd  ·  Reg: [Company Reg No.]  ·  VAT: [VAT No.]  ·  Gauteng, South Africa", "SP_FootTxt")],
           style="BG_Footer"),
    ], "CS_Footer"),
    tc([
        p(spans=[("agisano.com  ·  hello@agisano.com", "SP_FootRight")], style="BG_Footer"),
    ], "CS_FooterR"),
    rs=row_style("RS_Footer", "0.7cm", exact=True),
))

body.addElement(t5)

# ── Save ──────────────────────────────────────────────────────────────────────
out = "/home/kagiso/agisano/agisano-website/agisano-letterhead-template.odt"
doc.save(out)
print(f"Saved: {out}")
