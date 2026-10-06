from xml.sax.saxutils import escape

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


def write(doc, units, out):
    body = getSampleStyleSheet()["BodyText"]
    body.leading = 15
    story = []
    for u in units:
        if u.strip():
            story += [Paragraph(escape(u).replace("\n", "<br/>"), body), Spacer(1, 4 * mm)]
    SimpleDocTemplate(
        str(out),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
    ).build(story)
